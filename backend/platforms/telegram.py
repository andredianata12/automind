import httpx
from typing import Dict, Any, Optional, List
from platforms.base import PlatformConnector


class TelegramConnector(PlatformConnector):
    platform_name = "telegram"

    def __init__(self, credentials: Dict[str, Any], settings: Dict[str, Any] = None):
        super().__init__(credentials, settings)
        self.bot_token = credentials.get("bot_token", "")
        self.base_url = f"https://api.telegram.org/bot{self.bot_token}"

    async def connect(self) -> bool:
        async with httpx.AsyncClient() as client:
            resp = await client.get(f"{self.base_url}/getMe")
            return resp.status_code == 200

    async def send_message(self, recipient_id: str, content: str, **kwargs) -> Dict[str, Any]:
        async with httpx.AsyncClient() as client:
            resp = await client.post(f"{self.base_url}/sendMessage", json={
                "chat_id": recipient_id,
                "text": content,
                "parse_mode": "HTML",
            })
            return resp.json()

    async def get_conversation_history(self, contact_id: str, limit: int = 20) -> List[Dict]:
        # Telegram doesn't provide message history via API
        # We rely on our own database for history
        return []

    async def parse_webhook(self, payload: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        message = payload.get("message", {})
        if not message:
            return None

        chat = message.get("chat", {})
        user = message.get("from", {})

        return self.normalize_message({
            "sender_id": str(chat.get("id", "")),
            "sender_name": user.get("first_name", "") + " " + user.get("last_name", ""),
            "content": message.get("text", ""),
            "message_type": "text",
            "message_id": str(message.get("message_id", "")),
            "timestamp": message.get("date"),
        })
