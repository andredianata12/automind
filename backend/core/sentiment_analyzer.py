import json
from typing import Dict, Any
from config.settings import settings
from config.prompts import SENTIMENT_PROMPT

try:
    from openai import AsyncOpenAI
    client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY) if settings.OPENAI_API_KEY else None
except ImportError:
    client = None


class SentimentAnalyzer:
    """Analyze message sentiment using AI."""

    async def analyze(self, message: str) -> Dict[str, Any]:
        if not client:
            return self._fallback_analyze(message)

        try:
            response = await client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": "You are a sentiment analyzer. Respond only with JSON."},
                    {"role": "user", "content": SENTIMENT_PROMPT.format(message=message)},
                ],
                temperature=0.1,
                max_tokens=100,
            )
            result = json.loads(response.choices[0].message.content)
            return {
                "sentiment": result.get("sentiment", "neutral"),
                "score": result.get("score", 0.0),
                "urgency": result.get("urgency", 3),
            }
        except Exception:
            return self._fallback_analyze(message)

    def _fallback_analyze(self, message: str) -> Dict[str, Any]:
        """Simple rule-based fallback."""
        msg = message.lower()
        
        negative_words = ["jelek", "rusak", "kecewa", "marah", "komplain", "refund", "scam", "penipu", "bad", "terrible", "worst"]
        positive_words = ["bagus", "suka", "mantap", "recommended", "puas", "good", "great", "love", "awesome"]
        
        neg_count = sum(1 for w in negative_words if w in msg)
        pos_count = sum(1 for w in positive_words if w in msg)
        
        if neg_count > pos_count:
            return {"sentiment": "negative", "score": -0.7, "urgency": 8}
        elif pos_count > neg_count:
            return {"sentiment": "positive", "score": 0.7, "urgency": 2}
        return {"sentiment": "neutral", "score": 0.0, "urgency": 3}
