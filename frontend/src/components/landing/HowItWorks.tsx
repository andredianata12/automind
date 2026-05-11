import { useState } from "react";

const steps = [
  {
    num: "01",
    title: "Connect Platforms",
    desc: "Link your WhatsApp, Instagram, Telegram, Shopee and more in under 5 minutes each.",
    detail: ["Scan QR or enter API credentials", "AutoMind starts listening for messages", "Supports 15+ platforms simultaneously"],
  },
  {
    num: "02",
    title: "Train Your AI",
    desc: "Upload your product catalog, set your brand voice, and teach the AI your business.",
    detail: ["Upload products, prices, and stock", "Set brand tone and greeting style", "Add FAQ and common responses"],
  },
  {
    num: "03",
    title: "Auto-Pilot",
    desc: "AI handles 90% of incoming messages automatically with smart, personalized replies.",
    detail: ["Intent detection for every message", "Lead scoring from 0-100", "Auto-reply with brand voice"],
  },
  {
    num: "04",
    title: "Grow",
    desc: "Track conversions, optimize responses, and scale your business communication.",
    detail: ["Real-time analytics dashboard", "A/B test reply strategies", "Follow-up automation"],
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section id="how-it-works" className="py-20 px-6 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How AutoMind Works</h2>
          <p className="text-gray-400 text-lg">From setup to automation in 4 simple steps</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Steps selector */}
          <div className="space-y-4">
            {steps.map((step, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-full text-left p-6 rounded-2xl transition-all ${
                  active === i
                    ? "bg-brand-600/10 border border-brand-500/30"
                    : "bg-gray-900 border border-gray-800 hover:border-gray-700"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`text-2xl font-bold ${active === i ? "text-brand-400" : "text-gray-600"}`}>{step.num}</span>
                  <div>
                    <h3 className={`text-lg font-semibold ${active === i ? "text-white" : "text-gray-400"}`}>{step.title}</h3>
                    <p className="text-sm text-gray-500">{step.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Step detail */}
          <div className="card">
            <div className="text-6xl font-bold text-brand-600/20 mb-4">{steps[active].num}</div>
            <h3 className="text-2xl font-bold mb-4">{steps[active].title}</h3>
            <p className="text-gray-400 mb-6">{steps[active].desc}</p>
            <ul className="space-y-3">
              {steps[active].detail.map((d, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <span className="text-brand-400">✓</span> {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
