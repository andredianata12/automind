"""
Webhook endpoints for receiving messages from platforms.
Each webhook receives raw platform data, normalizes it, and sends to MessageProcessor.
"""

from fastapi import APIRouter, Request, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any

from models.database import get_db
from models.platform_connection import PlatformConnection
from config.settings import settings
from services.message_processor import message_processor

router = APIRouter()


async def _process_platform_webhook(platform: str, request: Request, db: Session):
    """Common webhook processing logic."""
    try:
        body = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON payload")

    # Find all users connected to this platform
    connections = db.query(PlatformConnection).filter(
        PlatformConnection.platform == platform,
        PlatformConnection.is_active == True,
    ).all()

    if not connections:
        return {"status": "no_connections", "message": f"No active {platform} connections"}

    results = []
    for conn in connections:
        # Parse the webhook into normalized format
        raw_message = _parse_webhook_payload(platform, body)
        if raw_message:
            result = await message_processor.process_incoming(
                user_id=conn.user_id,
                platform=platform,
                raw_message=raw_message,
            )
            if result:
                results.append(result)

    return {"status": "processed", "results": len(results)}


def _parse_webhook_payload(platform: str, body: Dict[str, Any]) -> Dict[str, Any] | None:
    """Parse platform-specific webhook payload into normalized format."""

    if platform == "telegram":
        message = body.get("message", {})
        if not message:
            return None
        chat = message.get("chat", {})
        user = message.get("from", {})
        return {
            "sender_id": str(chat.get("id", "")),
            "sender_name": f"{user.get('first_name', '')} {user.get('last_name', '')}".strip(),
            "content": message.get("text", ""),
            "message_type": "text",
            "platform_message_id": str(message.get("message_id", "")),
        }

    elif platform == "whatsapp":
        entry = body.get("entry", [{}])[0]
        changes = entry.get("changes", [{}])[0]
        value = changes.get("value", {})
        messages = value.get("messages", [])
        if not messages:
            return None
        msg = messages[0]
        contact = value.get("contacts", [{}])[0]
        return {
            "sender_id": msg.get("from", ""),
            "sender_name": contact.get("profile", {}).get("name", ""),
            "content": msg.get("text", {}).get("body", ""),
            "message_type": msg.get("type", "text"),
            "platform_message_id": msg.get("id", ""),
        }

    elif platform == "instagram":
        entries = body.get("entry", [])
        for entry in entries:
            messaging = entry.get("messaging", [])
            for event in messaging:
                sender = event.get("sender", {})
                message = event.get("message", {})
                if message.get("text"):
                    return {
                        "sender_id": sender.get("id", ""),
                        "sender_name": "",
                        "content": message.get("text", ""),
                        "message_type": "text",
                        "platform_message_id": message.get("mid", ""),
                    }
        return None

    elif platform == "shopee":
        message = body.get("message", {})
        if not message:
            return None
        return {
            "sender_id": str(message.get("buyer_id", "")),
            "sender_name": message.get("buyer_name", ""),
            "content": message.get("content", ""),
            "message_type": message.get("type", "text"),
            "platform_message_id": str(message.get("message_id", "")),
        }

    return None


@router.post("/telegram")
async def telegram_webhook(request: Request, db: Session = Depends(get_db)):
    return await _process_platform_webhook("telegram", request, db)


@router.post("/whatsapp")
async def whatsapp_webhook(request: Request, db: Session = Depends(get_db)):
    return await _process_platform_webhook("whatsapp", request, db)


@router.post("/instagram")
async def instagram_webhook(request: Request, db: Session = Depends(get_db)):
    return await _process_platform_webhook("instagram", request, db)


@router.post("/shopee")
async def shopee_webhook(request: Request, db: Session = Depends(get_db)):
    return await _process_platform_webhook("shopee", request, db)


@router.get("/verify/{platform}")
async def verify_webhook(platform: str, request: Request):
    """Verify webhook endpoints (used by Meta, Telegram, etc.)"""
    params = dict(request.query_params)

    if platform in ("instagram", "facebook", "whatsapp"):
        hub_mode = params.get("hub.mode")
        hub_token = params.get("hub.verify_token")
        hub_challenge = params.get("hub.challenge")
        if hub_mode == "subscribe" and hub_token == settings.SECRET_KEY:
            return int(hub_challenge)
        raise HTTPException(status_code=403, detail="Verification failed")

    return {"status": "ok", "platform": platform}
