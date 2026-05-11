"""
Message Processing Service — connects webhook → AI engine → database → reply.
This is the core pipeline that makes AutoMind actually work.
"""

from typing import Dict, Any, Optional, List
from sqlalchemy.orm import Session
from datetime import datetime, timezone

from models.database import SessionLocal
from models.user import User
from models.message import Message
from models.conversation import Conversation
from models.lead import Lead
from models.product import Product
from models.platform_connection import PlatformConnection
from core.ai_engine import AIEngine
from services.notification_service import NotificationService
from platforms.registry import get_connector


class MessageProcessor:
    """Process incoming messages through the full AI pipeline."""

    def __init__(self):
        self.ai_engine = AIEngine()
        self.notification_service = NotificationService()

    async def process_incoming(
        self,
        user_id: int,
        platform: str,
        raw_message: Dict[str, Any],
    ) -> Optional[Dict[str, Any]]:
        """
        Full pipeline:
        1. Normalize message
        2. Find/create conversation
        3. Save incoming message
        4. Build context (history)
        5. Load knowledge base
        6. Run AI pipeline
        7. Save AI analysis to message
        8. Create/update lead
        9. Generate & send reply (if auto-reply)
        10. Notify owner (if needed)
        """
        db = SessionLocal()
        try:
            # 1. Normalize
            sender_id = raw_message.get("sender_id", "")
            sender_name = raw_message.get("sender_name", "")
            content = raw_message.get("content", "")
            message_type = raw_message.get("message_type", "text")
            platform_message_id = raw_message.get("platform_message_id", "")

            if not content or not sender_id:
                return None

            # 2. Find or create conversation
            conversation = db.query(Conversation).filter(
                Conversation.user_id == user_id,
                Conversation.platform == platform,
                Conversation.contact_id == sender_id,
            ).first()

            if not conversation:
                conversation = Conversation(
                    user_id=user_id,
                    platform=platform,
                    contact_id=sender_id,
                    contact_name=sender_name,
                    status="active",
                )
                db.add(conversation)
                db.commit()
                db.refresh(conversation)

            # 3. Save incoming message
            incoming_msg = Message(
                conversation_id=conversation.id,
                platform=platform,
                platform_message_id=platform_message_id,
                sender_id=sender_id,
                sender_name=sender_name,
                content=content,
                message_type=message_type,
                direction="incoming",
            )
            db.add(incoming_msg)
            db.commit()
            db.refresh(incoming_msg)

            # 4. Build conversation history
            history_msgs = db.query(Message).filter(
                Message.conversation_id == conversation.id,
            ).order_by(Message.created_at.desc()).limit(20).all()
            history_msgs.reverse()

            history = [
                {"role": "user" if m.direction == "incoming" else "assistant", "content": m.content}
                for m in history_msgs
            ]

            # 5. Load knowledge base
            products = db.query(Product).filter(
                Product.user_id == user_id,
                Product.is_active == 1,
            ).all()

            knowledge_base = {
                "products": [
                    {"name": p.name, "price": p.price, "stock": p.stock, "description": p.description}
                    for p in products
                ],
                "faqs": [],  # TODO: load from FAQ table
            }

            # 6. Load brand voice from user settings
            user = db.query(User).filter(User.id == user_id).first()
            brand_voice = {
                "business_name": user.business_name or user.username,
                "greeting": "Halo kak! 😊",
                "tone": "friendly",
            }

            # 7. Contact info for lead scoring
            contact_info = {
                "name": sender_name,
                "avatar": None,
                "follower_count": 0,
            }

            # 8. Run AI pipeline
            result = await self.ai_engine.process_message(
                message=content,
                conversation_history=history,
                contact_info=contact_info,
                knowledge_base=knowledge_base,
                brand_voice=brand_voice,
            )

            # 9. Update message with AI analysis
            incoming_msg.detected_intent = result["intent"]["intent"]
            incoming_msg.intent_confidence = result["intent"]["confidence"]
            incoming_msg.sentiment = result["sentiment"]["sentiment"]
            incoming_msg.sentiment_score = result["sentiment"]["score"]
            db.commit()

            # 10. Create or update lead
            lead = db.query(Lead).filter(
                Lead.user_id == user_id,
                Lead.conversation_id == conversation.id,
            ).first()

            if not lead:
                lead = Lead(
                    user_id=user_id,
                    conversation_id=conversation.id,
                    contact_id=sender_id,
                    contact_name=sender_name,
                    platform=platform,
                )
                db.add(lead)

            lead.score = result["lead"]["score"]
            lead.tier = result["lead"]["tier"]
            lead.primary_intent = result["intent"]["intent"]
            lead.sentiment = result["sentiment"]["sentiment"]
            db.commit()

            # 11. Handle decision
            decision = result["decision"]
            reply_content = None

            if decision["action"] == "auto_reply" and result["reply"]:
                reply_content = result["reply"]["content"]

                # Save outgoing message
                outgoing_msg = Message(
                    conversation_id=conversation.id,
                    platform=platform,
                    sender_id="automind_ai",
                    sender_name="AutoMind AI",
                    content=reply_content,
                    message_type="text",
                    direction="outgoing",
                    is_ai_reply=True,
                )
                db.add(outgoing_msg)
                db.commit()

                # Actually send the reply via platform connector
                try:
                    conn_record = db.query(PlatformConnection).filter(
                        PlatformConnection.user_id == user_id,
                        PlatformConnection.platform == platform,
                        PlatformConnection.is_active == True,
                    ).first()

                    if conn_record and conn_record.credentials:
                        connector = get_connector(platform, conn_record.credentials)
                        await connector.send_message(sender_id, reply_content)
                except Exception as e:
                    print(f"Failed to send reply via {platform}: {e}")

            elif decision["action"] == "block":
                conversation.status = "blocked"
                db.commit()

            # 12. Notify owner if needed
            if decision.get("notify_owner"):
                if lead.tier == "hot":
                    await self.notification_service.notify_hot_lead({
                        "contact_name": sender_name,
                        "platform": platform,
                        "score": result["lead"]["score"],
                        "intent": result["intent"]["intent"],
                        "last_message": content,
                    })
                elif result["intent"]["intent"] == "COMPLAINT":
                    await self.notification_service.notify_complaint({
                        "contact_name": sender_name,
                        "platform": platform,
                        "urgency": result["sentiment"].get("urgency", 5),
                        "message": content,
                    })

            # Update conversation timestamp
            conversation.last_message_at = datetime.now(timezone.utc)
            db.commit()

            return {
                "message_id": incoming_msg.id,
                "conversation_id": conversation.id,
                "intent": result["intent"],
                "sentiment": result["sentiment"],
                "lead": result["lead"],
                "decision": decision,
                "reply": reply_content,
            }

        except Exception as e:
            db.rollback()
            print(f"Message processing error: {e}")
            import traceback
            traceback.print_exc()
            return None
        finally:
            db.close()


# Singleton instance
message_processor = MessageProcessor()
