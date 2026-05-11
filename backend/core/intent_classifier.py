import json
from typing import Dict, Any, List
from config.settings import settings
from config.prompts import INTENT_CLASSIFICATION_PROMPT

try:
    from openai import AsyncOpenAI
    client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY) if settings.OPENAI_API_KEY else None
except ImportError:
    client = None


INTENTS = [
    "PURCHASE_INQUIRY", "PRICE_CHECK", "COMPLAINT", "GENERAL_QUESTION",
    "COLLAB_OFFER", "FOLLOW_UP_REPLY", "GREETING", "SPAM",
]


class IntentClassifier:
    """Classify message intent using AI."""

    async def classify(self, message: str, history: List[dict]) -> Dict[str, Any]:
        if not client:
            return self._fallback_classify(message)

        context = "\n".join([f"{m.get('role', 'user')}: {m.get('content', '')}" for m in history[-5:]])

        try:
            response = await client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": "You are an intent classifier for business chat messages. Respond only with JSON."},
                    {"role": "user", "content": INTENT_CLASSIFICATION_PROMPT.format(message=message, context=context)},
                ],
                temperature=0.1,
                max_tokens=100,
            )
            result = json.loads(response.choices[0].message.content)
            return {
                "intent": result.get("intent", "GENERAL_QUESTION"),
                "confidence": result.get("confidence", 0.5),
            }
        except Exception as e:
            return self._fallback_classify(message)

    def _fallback_classify(self, message: str) -> Dict[str, Any]:
        """Rule-based fallback when AI is unavailable."""
        msg = message.lower()
        
        purchase_keywords = ["beli", "order", "mau beli", "checkout", "pesan", "buy", "order", "purchase"]
        price_keywords = ["harga", "berapa", "price", "cost", "biaya", "tarif", "ongkir"]
        complaint_keywords = ["komplain", "rusak", "jelek", "kecewa", "refund", "return", "complaint", "broken"]
        greeting_keywords = ["halo", "hai", "hi", "hello", "selamat", "good morning"]
        
        for kw in purchase_keywords:
            if kw in msg:
                return {"intent": "PURCHASE_INQUIRY", "confidence": 0.7}
        for kw in price_keywords:
            if kw in msg:
                return {"intent": "PRICE_CHECK", "confidence": 0.7}
        for kw in complaint_keywords:
            if kw in msg:
                return {"intent": "COMPLAINT", "confidence": 0.7}
        for kw in greeting_keywords:
            if kw in msg:
                return {"intent": "GREETING", "confidence": 0.8}
        
        return {"intent": "GENERAL_QUESTION", "confidence": 0.4}
