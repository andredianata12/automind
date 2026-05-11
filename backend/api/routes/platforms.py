from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

from models.database import get_db
from models.platform_connection import PlatformConnection
from models.user import User
from api.routes.auth import get_current_user

router = APIRouter()

SUPPORTED_PLATFORMS = [
    "whatsapp", "instagram", "telegram", "twitter", "facebook",
    "shopee", "tokopedia", "lazada", "bukalapak", "tiktok_shop",
    "line", "discord", "slack", "website", "email", "sms",
]


class PlatformConnect(BaseModel):
    platform: str
    credentials: Dict[str, Any] = {}
    settings: Dict[str, Any] = {}


class PlatformResponse(BaseModel):
    id: int
    platform: str
    platform_account_name: Optional[str]
    is_active: bool
    status: str
    contact_count: int
    message_count: int

    class Config:
        from_attributes = True


@router.get("/", response_model=List[PlatformResponse])
def list_platforms(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(PlatformConnection).filter(PlatformConnection.user_id == current_user.id).all()


@router.get("/supported")
def list_supported():
    return {"platforms": SUPPORTED_PLATFORMS}


@router.post("/connect", response_model=PlatformResponse)
def connect_platform(
    data: PlatformConnect,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if data.platform not in SUPPORTED_PLATFORMS:
        raise HTTPException(status_code=400, detail=f"Unsupported platform: {data.platform}")
    
    existing = db.query(PlatformConnection).filter(
        PlatformConnection.user_id == current_user.id,
        PlatformConnection.platform == data.platform,
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail=f"Platform {data.platform} already connected")
    
    conn = PlatformConnection(
        user_id=current_user.id,
        platform=data.platform,
        credentials=data.credentials,
        settings=data.settings,
        status="connected",
    )
    db.add(conn)
    db.commit()
    db.refresh(conn)
    return conn


@router.delete("/{platform_id}")
def disconnect_platform(
    platform_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    conn = db.query(PlatformConnection).filter(
        PlatformConnection.id == platform_id,
        PlatformConnection.user_id == current_user.id,
    ).first()
    if not conn:
        raise HTTPException(status_code=404, detail="Platform connection not found")
    db.delete(conn)
    db.commit()
    return {"message": f"Disconnected from {conn.platform}"}
