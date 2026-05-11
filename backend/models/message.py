from sqlalchemy import Column, String, Integer, DateTime, Text, ForeignKey, Float, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from models.database import Base


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("conversations.id"), nullable=False)
    platform = Column(String(50), nullable=False)  # whatsapp, instagram, telegram, shopee, etc.
    platform_message_id = Column(String(255))  # ID from the platform
    sender_id = Column(String(255), nullable=False)
    sender_name = Column(String(255))
    content = Column(Text, nullable=False)
    message_type = Column(String(50), default="text")  # text, image, audio, video
    direction = Column(String(10), nullable=False)  # incoming, outgoing
    is_ai_reply = Column(Boolean, default=False)

    # AI Analysis
    detected_intent = Column(String(100))
    intent_confidence = Column(Float)
    sentiment = Column(String(20))
    sentiment_score = Column(Float)

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relationships
    conversation = relationship("Conversation", back_populates="messages")
