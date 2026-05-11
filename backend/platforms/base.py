from abc import ABC, abstractmethod
from typing import Dict, Any, Optional, List


class PlatformConnector(ABC):
    """Base class for all platform connectors."""

    platform_name: str = ""

    def __init__(self, credentials: Dict[str, Any], settings: Dict[str, Any] = None):
        self.credentials = credentials
        self.settings = settings or {}

    @abstractmethod
    async def connect(self) -> bool:
        """Initialize connection to the platform."""
        pass

    @abstractmethod
    async def send_message(self, recipient_id: str, content: str, **kwargs) -> Dict[str, Any]:
        """Send a message to a recipient."""
        pass

    @abstractmethod
    async def get_conversation_history(self, contact_id: str, limit: int = 20) -> List[Dict]:
        """Get conversation history with a contact."""
        pass

    @abstractmethod
    async def parse_webhook(self, payload: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Parse incoming webhook payload into a normalized message format."""
        pass

    def normalize_message(self, raw: Dict[str, Any]) -> Dict[str, Any]:
        """Normalize a raw message into AutoMind format."""
        return {
            "platform": self.platform_name,
            "sender_id": raw.get("sender_id", ""),
            "sender_name": raw.get("sender_name", ""),
            "content": raw.get("content", ""),
            "message_type": raw.get("message_type", "text"),
            "platform_message_id": raw.get("message_id", ""),
            "timestamp": raw.get("timestamp"),
        }
