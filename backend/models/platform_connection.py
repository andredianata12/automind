from sqlalchemy import Column, String, Integer, DateTime, Boolean, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from models.database import Base


class PlatformConnection(Base):
    __tablename__ = "platform_connections"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    platform = Column(String(50), nullable=False)  # whatsapp, instagram, telegram, shopee, etc.
    platform_account_id = Column(String(255))
    platform_account_name = Column(String(255))
    credentials = Column(JSON)  # encrypted API keys, tokens
    settings = Column(JSON)  # platform-specific settings
    is_active = Column(Boolean, default=True)
    status = Column(String(50), default="connected")  # connected, disconnected, syncing, error
    last_sync_at = Column(DateTime)
    contact_count = Column(Integer, default=0)
    message_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    user = relationship("User", back_populates="platform_connections")
