import { useState } from "react";

const scenarios = [
  { id: "ecommerce", label: "🛒 E-Commerce", icon: "🛒" },
  { id: "service", label: "💼 Service", icon: "💼" },
  { id: "fnb", label: "🍕 F&B", icon: "🍕" },
];

const demoChats: Record<string, { user: string; ai: string; intent: string; score: number }[]> = {
  ecommerce: [
    { user: "Hey, do you have shoes in size 42?", ai: "Yes! Size 42 is in stock. Colors: Black, White, Navy. Price Rp 349,000. Want to order now? 😊", intent: "PURCHASE_INQUIRY", score: 87 },
    { user: "Can you go lower?", ai: "Today there's a 10% promo, so Rp 314,100 + free shipping to Jabodetabek! 🚚", intent: "PRICE_CHECK", score: 92 },
    { user: "Okay, checking out", ai: "Got it! 🎉 Thank you for your order. We'll process it right away!", intent: "PURCHASE_INQUIRY", score: 100 },
  ],
  service: [
    { user: "Hi, how much for logo design service?", ai: "Hi there! 😊 Logo design starts from Rp 500,000. Includes 3 revisions and vector files. Want to see our portfolio?", intent: "PRICE_CHECK", score: 75 },
    { user: "Can I see some examples?", ai: "Of course! Here are some of our latest portfolios: [link]. Which style do you like?", intent: "GENERAL_QUESTION", score: 80 },
    { user: "I like the minimalist one. Can I order?", ai: "Great choice! Minimalist style is very popular. You can order now, estimated completion 3-5 business days. Want to start? 🎨", intent: "PURCHASE_INQUIRY", score: 95 },
  ],
  fnb: [
    { user: "I'd like to order 2 portions of fried rice", ai: "Got it! 2 portions of fried rice. What spice level? Any extra egg or chicken? 🍳", intent: "PURCHASE_INQUIRY", score: 90 },
    { user: "Level 2, add egg", ai: "Okay! 2x Fried Rice Level 2 + Egg. Total Rp 56,000. GoFood/Grab or self pickup?", intent: "PURCHASE_INQUIRY", score: 95 },
    { user: "GoFood please", ai: "Done! Your order has been processed on GoFood. Estimated 25-30 minutes. Thank you! 🛵", intent: "PURCHASE_INQUIRY", score: 100 },
  ],
};

export default function LiveDemo() {
  const [activeScenario, setActiveScenario] = useState("ecommerce");
  const [msgIndex, setMsgIndex] = useState(0);

  const chats = demoChats[activeScenario];
  const current = chats[msgIndex];

  const nextMessage = () => setMsgIndex((prev) => (prev + 1) % chats.length);

  return (
    <section id="demo" className="py-20 px-6 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Try It Yourself — Live Demo</h2>
          <p className="text-gray-400 text-lg">See how AutoMind handles real conversations</p>
        </div>

        {/* Scenario selector */}
        <div className="flex justify-center gap-4 mb-8">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => { setActiveScenario(s.id); setMsgIndex(0); }}
              className={`px-6 py-3 rounded-xl transition-all ${
                activeScenario === s.id ? "bg-brand-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Chat simulation */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">💬 Simulated Chat</h3>
            <div className="space-y-4 min-h-[200px]">
              <div className="flex justify-end">
                <div className="bg-brand-600 text-white rounded-2xl px-4 py-3 max-w-[80%]">
                  <p className="text-sm">{current.user}</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-200 rounded-2xl px-4 py-3 max-w-[80%]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-brand-600/20 text-brand-400 px-2 py-0.5 rounded-full">AutoMind AI</span>
                  </div>
                  <p className="text-sm">{current.ai}</p>
                </div>
              </div>
            </div>
            <button onClick={nextMessage} className="btn-secondary w-full mt-4 text-sm">Next Message →</button>
          </div>

          {/* AI Brain Panel */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">🧠 AI Brain Panel</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-xl">
                <span className="text-gray-400 text-sm">Intent</span>
                <span className="text-brand-400 font-semibold">{current.intent}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-xl">
                <span className="text-gray-400 text-sm">Lead Score</span>
                <span className={`font-bold text-lg ${current.score >= 80 ? "text-red-400" : current.score >= 50 ? "text-yellow-400" : "text-blue-400"}`}>
                  {current.score >= 80 ? "🔥" : current.score >= 50 ? "🟡" : "🔵"} {current.score}/100
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-xl">
                <span className="text-gray-400 text-sm">Decision</span>
                <span className="text-green-400 font-semibold">Auto-Reply ✅</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-xl">
                <span className="text-gray-400 text-sm">Response Time</span>
                <span className="text-white font-semibold">0.8s</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Like what you see?</p>
          <a href="/register" className="btn-primary text-lg px-8 py-4">🚀 Start Free Trial</a>
        </div>
      </div>
    </section>
  );
}
