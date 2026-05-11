from typing import Dict, Any, List


class LeadScorer:
    """Score leads based on multiple signals."""

    # Intent weights
    INTENT_WEIGHTS = {
        "PURCHASE_INQUIRY": 35,
        "PRICE_CHECK": 25,
        "COLLAB_OFFER": 20,
        "GENERAL_QUESTION": 10,
        "FOLLOW_UP_REPLY": 15,
        "GREETING": 5,
        "COMPLAINT": -5,
        "SPAM": -50,
    }

    # Sentiment adjustments
    SENTIMENT_ADJUST = {
        "positive": 10,
        "neutral": 0,
        "negative": -10,
    }

    def score(
        self,
        intent: Dict[str, Any],
        sentiment: Dict[str, Any],
        contact_info: Dict[str, Any],
        conversation_history: List[dict],
    ) -> Dict[str, Any]:
        base_score = 20  # Everyone starts at 20

        # Intent component
        intent_name = intent.get("intent", "GENERAL_QUESTION")
        intent_confidence = intent.get("confidence", 0.5)
        intent_points = self.INTENT_WEIGHTS.get(intent_name, 10) * intent_confidence

        # Sentiment component
        sent = sentiment.get("sentiment", "neutral")
        sent_points = self.SENTIMENT_ADJUST.get(sent, 0)

        # Engagement component (more messages = more engaged)
        msg_count = len(conversation_history)
        engagement_points = min(msg_count * 2, 20)  # max 20

        # Profile component (has name, avatar = more real)
        profile_points = 0
        if contact_info.get("name"):
            profile_points += 5
        if contact_info.get("avatar"):
            profile_points += 3
        if contact_info.get("follower_count", 0) > 100:
            profile_points += 5

        # Calculate total
        total = int(base_score + intent_points + sent_points + engagement_points + profile_points)
        total = max(0, min(100, total))  # clamp 0-100

        # Determine tier
        if total >= 80:
            tier = "hot"
        elif total >= 50:
            tier = "warm"
        elif total >= 20:
            tier = "cold"
        else:
            tier = "non_lead"

        return {
            "score": total,
            "tier": tier,
            "breakdown": {
                "base": base_score,
                "intent": round(intent_points, 1),
                "sentiment": sent_points,
                "engagement": engagement_points,
                "profile": profile_points,
            },
        }
