from typing import Dict, Any, Optional
from core.intent_classifier import IntentClassifier
from core.sentiment_analyzer import SentimentAnalyzer
from core.lead_scorer import LeadScorer
from core.reply_generator import ReplyGenerator
from core.decision_engine import DecisionEngine


class AIEngine:
    """Main AI pipeline that processes incoming messages."""

    def __init__(self):
        self.intent_classifier = IntentClassifier()
        self.sentiment_analyzer = SentimentAnalyzer()
        self.lead_scorer = LeadScorer()
        self.reply_generator = ReplyGenerator()
        self.decision_engine = DecisionEngine()

    async def process_message(
        self,
        message: str,
        conversation_history: list[dict],
        contact_info: dict,
        knowledge_base: dict,
        brand_voice: dict,
    ) -> Dict[str, Any]:
        """Full AI pipeline for an incoming message."""

        # Step 1: Classify intent
        intent_result = await self.intent_classifier.classify(message, conversation_history)

        # Step 2: Analyze sentiment
        sentiment_result = await self.sentiment_analyzer.analyze(message)

        # Step 3: Score lead
        lead_result = self.lead_scorer.score(
            intent=intent_result,
            sentiment=sentiment_result,
            contact_info=contact_info,
            conversation_history=conversation_history,
        )

        # Step 4: Decide action
        decision = self.decision_engine.decide(
            intent=intent_result,
            sentiment=sentiment_result,
            lead_score=lead_result,
        )

        # Step 5: Generate reply (if auto-reply)
        reply = None
        if decision["action"] == "auto_reply":
            reply = await self.reply_generator.generate(
                message=message,
                intent=intent_result,
                sentiment=sentiment_result,
                history=conversation_history,
                knowledge_base=knowledge_base,
                brand_voice=brand_voice,
            )

        return {
            "intent": intent_result,
            "sentiment": sentiment_result,
            "lead": lead_result,
            "decision": decision,
            "reply": reply,
        }
