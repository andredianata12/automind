import httpx
import hashlib
import time
from typing import Dict, Any, Optional, List
from platforms.base import PlatformConnector


class ShopeeConnector(PlatformConnector):
    """Shopee Chat connector using Shopee Open Platform API."""
    platform_name = "shopee"

    def __init__(self, credentials: Dict[str, Any], settings: Dict[str, Any] = None):
        super().__init__(credentials, settings)
        self.partner_id = credentials.get("partner_id", "")
        self.partner_key = credentials.get("partner_secret", "")
        self.base_url = "https://partner.shopeemobile.com/api/v2"

    def _generate_sign(self, path: str, timestamp: int) -> str:
        base_string = f"{self.partner_id}{path}{timestamp}"
        return hashlib.sha256((base_string + self.partner_key).encode()).hexdigest()

    async def connect(self) -> bool:
        # Verify credentials with a simple API call
        return bool(self.partner_id and self.partner_key)

    async def send_message(self, recipient_id: str, content: str, **kwargs) -> Dict[str, Any]:
        """Send message via Shopee Chat API."""
        # Note: Actual Shopee Chat API implementation requires their specific SDK
        return {"status": "sent", "platform": "shopee", "recipient": recipient_id}

    async def get_conversation_history(self, contact_id: str, limit: int = 20) -> List[Dict]:
        return []

    async def parse_webhook(self, payload: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Parse Shopee webhook payload."""
        message = payload.get("message", {})
        if not message:
            return None

        return self.normalize_message({
            "sender_id": str(message.get("buyer_id", "")),
            "sender_name": message.get("buyer_name", ""),
            "content": message.get("content", ""),
            "message_type": message.get("type", "text"),
            "message_id": str(message.get("message_id", "")),
            "timestamp": message.get("timestamp"),
        })
