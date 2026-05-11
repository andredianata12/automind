from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

from models.database import get_db
from models.lead import Lead
from models.user import User
from api.routes.auth import get_current_user

router = APIRouter()


class LeadResponse(BaseModel):
    id: int
    contact_id: str
    contact_name: Optional[str]
    platform: str
    score: int
    tier: str
    primary_intent: Optional[str]
    sentiment: Optional[str]
    status: str
    notes: Optional[str]
    follow_up_count: int
    next_follow_up_at: Optional[datetime]
    created_at: datetime

    class Config:
        from_attributes = True


class LeadUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None


@router.get("/", response_model=List[LeadResponse])
def list_leads(
    tier: Optional[str] = None,
    status: Optional[str] = None,
    platform: Optional[str] = None,
    min_score: int = 0,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = db.query(Lead).filter(Lead.user_id == current_user.id, Lead.score >= min_score)
    if tier:
        query = query.filter(Lead.tier == tier)
    if status:
        query = query.filter(Lead.status == status)
    if platform:
        query = query.filter(Lead.platform == platform)
    return query.order_by(Lead.score.desc()).offset(skip).limit(limit).all()


@router.get("/stats")
def lead_stats(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    leads = db.query(Lead).filter(Lead.user_id == current_user.id).all()
    return {
        "total": len(leads),
        "hot": len([l for l in leads if l.tier == "hot"]),
        "warm": len([l for l in leads if l.tier == "warm"]),
        "cold": len([l for l in leads if l.tier == "cold"]),
        "non_lead": len([l for l in leads if l.tier == "non_lead"]),
        "avg_score": sum(l.score for l in leads) / len(leads) if leads else 0,
    }


@router.patch("/{lead_id}", response_model=LeadResponse)
def update_lead(
    lead_id: int,
    data: LeadUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    lead = db.query(Lead).filter(Lead.id == lead_id, Lead.user_id == current_user.id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    if data.status:
        lead.status = data.status
    if data.notes is not None:
        lead.notes = data.notes
    db.commit()
    db.refresh(lead)
    return lead
