from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

from models.database import get_db
from models.message import Message
from models.conversation import Conversation
from models.user import User
from models.platform_connection import PlatformConnection
from api.routes.auth import get_current_user
from platforms.registry import get_connector

router = APIRouter()


class MessageResponse(BaseModel):
    id: int
    conversation_id: int
    platform: str
    sender_id: str
    sender_name: Optional[str]
    content: str
    direction: str
    is_ai_reply: bool
    detected_intent: Optional[str]
    sentiment: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class ConversationResponse(BaseModel):
    id: int
    platform: str
    contact_id: str
    contact_name: Optional[str]
    status: str
    last_message_at: datetime
    message_count: int = 0
    lead_score: Optional[int] = None

    class Config:
        from_attributes = True


class SendMessageRequest(BaseModel):
    conversation_id: int
    content: str
    override_ai: bool = True  # True = human override, False = AI reply


@router.get("/conversations", response_model=List[ConversationResponse])
def list_conversations(
    platform: Optional[str] = None,
    status: Optional[str] = None,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = db.query(Conversation).filter(Conversation.user_id == current_user.id)
    if platform:
        query = query.filter(Conversation.platform == platform)
    if status:
        query = query.filter(Conversation.status == status)
    conversations = query.order_by(Conversation.last_message_at.desc()).offset(skip).limit(limit).all()

    # Enrich with message count and lead score
    result = []
    for conv in conversations:
        msg_count = db.query(Message).filter(Message.conversation_id == conv.id).count()
        lead = getattr(conv, "lead", None)
        result.append({
            "id": conv.id,
            "platform": conv.platform,
            "contact_id": conv.contact_id,
            "contact_name": conv.contact_name,
            "status": conv.status,
            "last_message_at": conv.last_message_at,
            "message_count": msg_count,
            "lead_score": lead.score if lead else None,
        })
    return result


@router.get("/conversations/{conversation_id}/messages", response_model=List[MessageResponse])
def get_messages(
    conversation_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    conv = db.query(Conversation).filter(
        Conversation.id == conversation_id,
        Conversation.user_id == current_user.id,
    ).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return db.query(Message).filter(
        Message.conversation_id == conversation_id
    ).order_by(Message.created_at.asc()).offset(skip).limit(limit).all()


@router.post("/send")
async def send_message(
    data: SendMessageRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Send a manual message (owner override) to a conversation."""
    conv = db.query(Conversation).filter(
        Conversation.id == data.conversation_id,
        Conversation.user_id == current_user.id,
    ).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")

    # Save outgoing message
    outgoing = Message(
        conversation_id=conv.id,
        platform=conv.platform,
        sender_id=str(current_user.id),
        sender_name=current_user.full_name or current_user.username,
        content=data.content,
        message_type="text",
        direction="outgoing",
        is_ai_reply=not data.override_ai,
    )
    db.add(outgoing)

    # Send via platform connector
    sent = False
    try:
        conn_record = db.query(PlatformConnection).filter(
            PlatformConnection.user_id == current_user.id,
            PlatformConnection.platform == conv.platform,
            PlatformConnection.is_active == True,
        ).first()

        if conn_record and conn_record.credentials:
            connector = get_connector(conv.platform, conn_record.credentials)
            await connector.send_message(conv.contact_id, data.content)
            sent = True
    except Exception as e:
        print(f"Failed to send message: {e}")

    # Update conversation timestamp
    conv.last_message_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(outgoing)

    return {
        "message_id": outgoing.id,
        "sent_to_platform": sent,
        "platform": conv.platform,
        "recipient": conv.contact_id,
    }
