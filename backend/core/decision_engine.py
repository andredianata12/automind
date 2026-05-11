from typing import Dict, Any


class DecisionEngine:
    """Decide what action to take for each message."""

    def decide(
        self,
        intent: Dict[str, Any],
        sentiment: Dict[str, Any],
        lead_score: Dict[str, Any],
    ) -> Dict[str, Any]:
        intent_name = intent.get("intent", "GENERAL_QUESTION")
        sentiment_name = sentiment.get("sentiment", "neutral")
        urgency = sentiment.get("urgency", 3)
        score = lead_score.get("score", 0)
        tier = lead_score.get("tier", "non_lead")

        # Rule 1: Spam → auto-block
        if intent_name == "SPAM":
            return {"action": "block", "reason": "Detected as spam", "notify_owner": False}

        # Rule 2: Complaint with high urgency → escalate immediately
        if intent_name == "COMPLAINT" and urgency >= 7:
            return {"action": "escalate", "reason": "High-urgency complaint", "notify_owner": True}

        # Rule 3: Hot lead + purchase intent → auto-reply + notify owner
        if tier == "hot" and intent_name in ["PURCHASE_INQUIRY", "PRICE_CHECK"]:
            return {"action": "auto_reply", "reason": "Hot lead - purchase intent", "notify_owner": True}

        # Rule 4: Hot lead (any intent) → auto-reply + notify
        if tier == "hot":
            return {"action": "auto_reply", "reason": "Hot lead detected", "notify_owner": True}

        # Rule 5: Complaint → escalate to human
        if intent_name == "COMPLAINT":
            return {"action": "escalate", "reason": "Complaint needs human attention", "notify_owner": True}

        # Rule 6: Collab offer → queue for owner review
        if intent_name == "COLLAB_OFFER":
            return {"action": "queue", "reason": "Collaboration offer needs review", "notify_owner": True}

        # Rule 7: Everything else → auto-reply
        return {"action": "auto_reply", "reason": "Standard inquiry", "notify_owner": False}
