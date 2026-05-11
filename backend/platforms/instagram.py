import httpx
from typing import Dict, Any, Optional, List
from platforms.base import PlatformConnector


class InstagramConnector(PlatformConnector):
    """Instagram DM connector via Instagram Graph API."""
    platform_name = "instagram"

    def __init__(self, credentials: Dict[str, Any], settings: Dict[str, Any] = None):
        super().__init__(credentials, settings)
        self.access_token = credentials.get("access_token", "")
        self.page_id = credentials.get("page_id", "")
        self.base_url = "https://graph.facebook.com/v18.0"

    async def connect(self) -> bool:
        async with httpx.AsyncClient() as client:
            resp = await client.get(f"{self.base_url}/me", params={"access_token": self.access_token})
            return resp.status_code == 200

    async def send_message(self, recipient_id: str, content: str, **kwargs) -> Dict[str, Any]:
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                f"{self.base_url}/{self.page_id}/messages",
                params={"access_token": self.access_token},
                json={
                    "recipient": {"id": recipient_id},
                    "message": {"text": content},
                    "messaging_type": "RESPONSE",
                },
            )
            return resp.json()

    async def get_conversation_history(self, contact_id: str, limit: int = 20) -> List[Dict]:
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"{self.base_url}/{contact_id}/messages",
                params={"access_token": self.access_token, "limit": limit},
            )
            data = resp.json()
            return data.get("data", [])

    async def parse_webhook(self, payload: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        entries = payload.get("entry", [])
        for entry in entries:
            messaging_events = entry.get("messaging", [])
            for event in messaging_events:
                sender = event.get("sender", {})
                message = event.get("message", {})
                if message.get("text"):
                    return self.normalize_message({
                        "sender_id": sender.get("id", ""),
                        "sender_name": "",
                        "content": message.get("text", ""),
                        "message_type": "text",
                        "message_id": message.get("mid", ""),
                        "timestamp": event.get("timestamp"),
                    })
        return None
