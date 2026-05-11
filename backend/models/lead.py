from sqlalchemy import Column, String, Integer, DateTime, Float, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from models.database import Base


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    conversation_id = Column(Integer, ForeignKey("conversations.id"), nullable=False)
    contact_id = Column(String(255), nullable=False)
    contact_name = Column(String(255))
    platform = Column(String(50), nullable=False)

    # Scoring
    score = Column(Integer, default=0)  # 0-100
    tier = Column(String(20), default="non_lead")  # hot, warm, cold, non_lead
    primary_intent = Column(String(100))
    sentiment = Column(String(20))

    # Status
    status = Column(String(50), default="new")  # new, contacted, qualified, converted, lost
    notes = Column(Text)
    follow_up_count = Column(Integer, default=0)
    next_follow_up_at = Column(DateTime)

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    user = relationship("User", back_populates="leads")
    conversation = relationship("Conversation", back_populates="lead")
