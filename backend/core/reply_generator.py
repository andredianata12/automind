import json
from typing import Dict, Any, List, Optional
from config.settings import settings
from config.prompts import REPLY_GENERATION_PROMPT

try:
    from openai import AsyncOpenAI
    client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY) if settings.OPENAI_API_KEY else None
except ImportError:
    client = None


class ReplyGenerator:
    """Generate AI-powered replies."""

    async def generate(
        self,
        message: str,
        intent: Dict[str, Any],
        sentiment: Dict[str, Any],
        history: List[dict],
        knowledge_base: Dict[str, Any],
        brand_voice: Dict[str, Any],
    ) -> Dict[str, Any]:
        if not client:
            return self._fallback_reply(message, intent, knowledge_base, brand_voice)

        kb_text = self._format_knowledge(knowledge_base)
        history_text = "\n".join([f"{m.get('role', 'user')}: {m.get('content', '')}" for m in history[-5:]])

        prompt = REPLY_GENERATION_PROMPT.format(
            business_name=brand_voice.get("business_name", "our business"),
            brand_voice=json.dumps(brand_voice),
            knowledge_context=kb_text,
            message=message,
            intent=json.dumps(intent),
            history=history_text,
        )

        try:
            response = await client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": prompt},
                    {"role": "user", "content": message},
                ],
                temperature=0.7,
                max_tokens=300,
            )
            return {
                "content": response.choices[0].message.content,
                "confidence": 0.9,
                "source": "ai",
            }
        except Exception:
            return self._fallback_reply(message, intent, knowledge_base, brand_voice)

    def _format_knowledge(self, kb: Dict[str, Any]) -> str:
        if not kb:
            return "No product information available."
        
        products = kb.get("products", [])
        faqs = kb.get("faqs", [])
        
        parts = []
        if products:
            parts.append("Products:")
            for p in products[:10]:
                parts.append(f"- {p.get('name', '')}: Rp {p.get('price', 'N/A')} | Stock: {p.get('stock', 'N/A')}")
        if faqs:
            parts.append("\nFAQs:")
            for f in faqs[:5]:
                parts.append(f"Q: {f.get('question', '')} A: {f.get('answer', '')}")
        
        return "\n".join(parts) if parts else "No information available."

    def _fallback_reply(self, message: str, intent: Dict[str, Any], kb: Dict[str, Any], brand_voice: Dict[str, Any]) -> Dict[str, Any]:
        """Template-based fallback replies."""
        greeting = brand_voice.get("greeting", "Hi there! 😊")
        intent_name = intent.get("intent", "GENERAL_QUESTION")

        templates = {
            "PURCHASE_INQUIRY": f"{greeting} Thank you for your interest! Which product would you like to know about? We're happy to help 😊",
            "PRICE_CHECK": f"{greeting} For pricing info, could you tell us which product you're looking for? We'll give you the best price!",
            "COMPLAINT": f"{greeting} We're sorry for the inconvenience. We'll help resolve this right away. Could you describe the issue?",
            "GREETING": f"{greeting} How can we help you today?",
            "GENERAL_QUESTION": f"{greeting} Regarding your question, could you provide more details? We'll do our best to answer!",
            "COLLAB_OFFER": f"Thank you for the offer! We'll forward it to the relevant team and get back to you soon 😊",
        }

        return {
            "content": templates.get(intent_name, f"{greeting} Thank you for your message. We'll respond shortly!"),
            "confidence": 0.6,
            "source": "template",
        }
