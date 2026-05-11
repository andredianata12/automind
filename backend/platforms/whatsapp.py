import httpx
from typing import Dict, Any, Optional, List
from platforms.base import PlatformConnector


class WhatsAppConnector(PlatformConnector):
    """WhatsApp Business API connector."""
    platform_name = "whatsapp"

    def __init__(self, credentials: Dict[str, Any], settings: Dict[str, Any] = None):
        super().__init__(credentials, settings)
        self.access_token = credentials.get("access_token", "")
        self.phone_number_id = credentials.get("phone_number_id", "")
        self.base_url = f"https://graph.facebook.com/v18.0/{self.phone_number_id}"

    async def connect(self) -> bool:
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"{self.base_url}",
                params={"access_token": self.access_token},
            )
            return resp.status_code == 200

    async def send_message(self, recipient_id: str, content: str, **kwargs) -> Dict[str, Any]:
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                f"{self.base_url}/messages",
                headers={"Authorization": f"Bearer {self.access_token}"},
                json={
                    "messaging_product": "whatsapp",
                    "to": recipient_id,
                    "type": "text",
                    "text": {"body": content},
                },
            )
            return resp.json()

    async def get_conversation_history(self, contact_id: str, limit: int = 20) -> List[Dict]:
        return []  # WhatsApp API doesn't provide history

    async def parse_webhook(self, payload: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        entry = payload.get("entry", [{}])[0]
        changes = entry.get("changes", [{}])[0]
        value = changes.get("value", {})
        messages = value.get("messages", [])
        
        if not messages:
            return None
        
        msg = messages[0]
        contact = value.get("contacts", [{}])[0]
        
        return self.normalize_message({
            "sender_id": msg.get("from", ""),
            "sender_name": contact.get("profile", {}).get("name", ""),
            "content": msg.get("text", {}).get("body", ""),
            "message_type": msg.get("type", "text"),
            "message_id": msg.get("id", ""),
            "timestamp": msg.get("timestamp"),
        })
