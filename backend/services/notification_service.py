from typing import Dict, Any, Optional
from datetime import datetime, timezone


class NotificationService:
    """Send notifications to business owners."""

    def __init__(self):
        self._handlers = []

    def register_handler(self, handler):
        """Register a notification handler (email, push, telegram, etc.)"""
        self._handlers.append(handler)

    async def notify_hot_lead(self, lead_info: Dict[str, Any]):
        """Notify owner about a hot lead."""
        message = f"🔥 HOT LEAD DETECTED!\n"
        message += f"Contact: {lead_info.get('contact_name', 'Unknown')}\n"
        message += f"Platform: {lead_info.get('platform', 'Unknown')}\n"
        message += f"Score: {lead_info.get('score', 0)}/100\n"
        message += f"Intent: {lead_info.get('intent', 'Unknown')}\n"
        message += f"Message: {lead_info.get('last_message', '')[:100]}"
        
        await self._send_all(message)

    async def notify_complaint(self, complaint_info: Dict[str, Any]):
        """Notify owner about a complaint."""
        message = f"⚠️ COMPLAINT ALERT!\n"
        message += f"From: {complaint_info.get('contact_name', 'Unknown')}\n"
        message += f"Platform: {complaint_info.get('platform', 'Unknown')}\n"
        message += f"Urgency: {complaint_info.get('urgency', 'Unknown')}/10\n"
        message += f"Message: {complaint_info.get('message', '')[:200]}"
        
        await self._send_all(message)

    async def notify_collab_offer(self, offer_info: Dict[str, Any]):
        """Notify owner about a collaboration offer."""
        message = f"🤝 COLLABORATION OFFER\n"
        message += f"From: {offer_info.get('contact_name', 'Unknown')}\n"
        message += f"Platform: {offer_info.get('platform', 'Unknown')}\n"
        message += f"Message: {offer_info.get('message', '')[:200]}"
        
        await self._send_all(message)

    async def _send_all(self, message: str):
        for handler in self._handlers:
            try:
                await handler(message)
            except Exception as e:
                print(f"Notification handler error: {e}")
