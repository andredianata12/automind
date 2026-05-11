from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional
from datetime import datetime, timedelta, timezone

from models.database import get_db
from models.message import Message
from models.lead import Lead
from models.conversation import Conversation
from models.user import User
from api.routes.auth import get_current_user

router = APIRouter()


@router.get("/overview")
def get_overview(
    days: int = 7,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    since = datetime.now(timezone.utc) - timedelta(days=days)
    
    messages = db.query(Message).join(Conversation).filter(
        Conversation.user_id == current_user.id,
        Message.created_at >= since,
    ).all()
    
    leads = db.query(Lead).filter(
        Lead.user_id == current_user.id,
        Lead.created_at >= since,
    ).all()
    
    total_incoming = len([m for m in messages if m.direction == "incoming"])
    ai_replied = len([m for m in messages if m.is_ai_reply])
    hot_leads = len([l for l in leads if l.tier == "hot"])
    converted = len([l for l in leads if l.status == "converted"])
    
    return {
        "period_days": days,
        "total_messages": len(messages),
        "incoming_messages": total_incoming,
        "ai_replied": ai_replied,
        "ai_handle_rate": round(ai_replied / total_incoming * 100, 1) if total_incoming else 0,
        "total_leads": len(leads),
        "hot_leads": hot_leads,
        "conversion_rate": round(converted / len(leads) * 100, 1) if leads else 0,
    }


@router.get("/platform-stats")
def platform_stats(
    days: int = 30,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    since = datetime.now(timezone.utc) - timedelta(days=days)
    
    messages = db.query(Message).join(Conversation).filter(
        Conversation.user_id == current_user.id,
        Message.created_at >= since,
    ).all()
    
    stats = {}
    for msg in messages:
        if msg.platform not in stats:
            stats[msg.platform] = {"total": 0, "incoming": 0, "ai_replied": 0}
        stats[msg.platform]["total"] += 1
        if msg.direction == "incoming":
            stats[msg.platform]["incoming"] += 1
        if msg.is_ai_reply:
            stats[msg.platform]["ai_replied"] += 1
    
    return {"period_days": days, "platforms": stats}


@router.get("/intent-breakdown")
def intent_breakdown(
    days: int = 30,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    since = datetime.now(timezone.utc) - timedelta(days=days)
    
    messages = db.query(Message).join(Conversation).filter(
        Conversation.user_id == current_user.id,
        Message.created_at >= since,
        Message.direction == "incoming",
        Message.detected_intent.isnot(None),
    ).all()
    
    intents = {}
    for msg in messages:
        intent = msg.detected_intent
        intents[intent] = intents.get(intent, 0) + 1
    
    total = sum(intents.values())
    breakdown = {k: {"count": v, "percentage": round(v / total * 100, 1)} for k, v in intents.items()}
    return {"period_days": days, "intents": breakdown}
