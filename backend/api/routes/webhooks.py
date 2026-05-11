from fastapi import APIRouter, Request, HTTPException
from typing import Dict, Any

router = APIRouter()


@router.post("/instagram")
async def instagram_webhook(request: Request):
    """Handle Instagram Graph API webhooks."""
    body = await request.json()
    # TODO: Process Instagram webhook
    return {"status": "ok"}


@router.post("/telegram")
async def telegram_webhook(request: Request):
    """Handle Telegram bot webhooks."""
    body = await request.json()
    # TODO: Process Telegram webhook
    return {"status": "ok"}


@router.post("/whatsapp")
async def whatsapp_webhook(request: Request):
    """Handle WhatsApp Business API webhooks."""
    body = await request.json()
    # TODO: Process WhatsApp webhook
    return {"status": "ok"}


@router.post("/shopee")
async def shopee_webhook(request: Request):
    """Handle Shopee chat webhooks."""
    body = await request.json()
    # TODO: Process Shopee webhook
    return {"status": "ok"}


@router.get("/verify/{platform}")
async def verify_webhook(platform: str, request: Request):
    """Verify webhook endpoints (used by Meta, Telegram, etc.)"""
    params = dict(request.query_params)
    
    if platform == "instagram" or platform == "facebook":
        # Meta hub.verify_token challenge
        hub_mode = params.get("hub.mode")
        hub_token = params.get("hub.verify_token")
        hub_challenge = params.get("hub.challenge")
        if hub_mode == "subscribe" and hub_token == "automind_verify_token":
            return int(hub_challenge)
        raise HTTPException(status_code=403, detail="Verification failed")
    
    return {"status": "ok", "platform": platform}
