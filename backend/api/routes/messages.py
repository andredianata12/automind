from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

from models.database import get_db
from models.message import Message
from models.conversation import Conversation
from models.user import User
from api.routes.auth import get_current_user

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
    return query.order_by(Conversation.last_message_at.desc()).offset(skip).limit(limit).all()


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
