from sqlalchemy import Column, String, Integer, DateTime, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from models.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255))
    business_name = Column(String(255))
    is_active = Column(Boolean, default=True)
    plan = Column(String(50), default="starter")  # starter, growth, enterprise
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    platform_connections = relationship("PlatformConnection", back_populates="user")
    products = relationship("Product", back_populates="user")
    leads = relationship("Lead", back_populates="user")
    conversations = relationship("Conversation", back_populates="user")
