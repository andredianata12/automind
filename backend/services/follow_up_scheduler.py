from datetime import datetime, timedelta, timezone
from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from models.lead import Lead
from models.conversation import Conversation


class FollowUpScheduler:
    """Schedule and manage follow-up messages."""

    FOLLOW_UP_DELAYS = {
        "hot": timedelta(hours=2),
        "warm": timedelta(days=1),
        "cold": timedelta(days=3),
    }

    MAX_FOLLOW_UPS = 3

    FOLLOW_UP_TEMPLATES = [
        "Halo {name}! Masih tertarik dengan produk kami? Ada yang bisa kami bantu? 😊",
        "Halo {name}! Kami punya info menarik nih. Mau dengar? 🎉",
        "Halo {name}! Spesial untuk kamu, kami kasih penawaran istimewa! Mau tau? 💰",
    ]

    def schedule_follow_up(self, lead: Lead, db: Session):
        """Schedule next follow-up for a lead."""
        if lead.follow_up_count >= self.MAX_FOLLOW_UPS:
            return  # Max follow-ups reached

        delay = self.FOLLOW_UP_DELAYS.get(lead.tier, timedelta(days=1))
        lead.next_follow_up_at = datetime.now(timezone.utc) + delay
        db.commit()

    def get_pending_follow_ups(self, db: Session) -> list:
        """Get all leads that need follow-up now."""
        now = datetime.now(timezone.utc)
        return db.query(Lead).filter(
            Lead.next_follow_up_at <= now,
            Lead.follow_up_count < self.MAX_FOLLOW_UPS,
            Lead.status.notin_(["converted", "lost"]),
        ).all()

    def get_follow_up_message(self, lead: Lead) -> str:
        """Generate personalized follow-up message."""
        template_idx = min(lead.follow_up_count, len(self.FOLLOW_UP_TEMPLATES) - 1)
        return self.FOLLOW_UP_TEMPLATES[template_idx].format(
            name=lead.contact_name or "kak"
        )

    def mark_follow_up_sent(self, lead: Lead, db: Session):
        """Update lead after sending follow-up."""
        lead.follow_up_count += 1
        lead.next_follow_up_at = None
        db.commit()
