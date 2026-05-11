import { useState } from "react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: { monthly: "Rp 299K", yearly: "Rp 209K" },
    desc: "Perfect for small businesses just getting started",
    features: ["2 platforms", "500 messages/month", "Basic AI replies", "Email support", "Lead scoring"],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Growth",
    price: { monthly: "Rp 799K", yearly: "Rp 559K" },
    desc: "For growing businesses that need more power",
    features: ["5 platforms", "5,000 messages/month", "Advanced AI + learning", "Priority support", "Analytics dashboard", "Follow-up automation", "Knowledge base"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: "Custom", yearly: "Custom" },
    desc: "For large businesses with custom needs",
    features: ["Unlimited platforms", "Unlimited messages", "Custom AI training", "Dedicated support", "API access", "White-label option", "SLA guarantee"],
    cta: "Contact Us",
    popular: false,
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-400 text-lg mb-6">Start free, scale as you grow</p>
          <div className="inline-flex items-center gap-3 bg-gray-900 rounded-full p-1">
            <button onClick={() => setYearly(false)} className={`px-4 py-2 rounded-full text-sm transition-all ${!yearly ? "bg-brand-600 text-white" : "text-gray-400"}`}>Monthly</button>
            <button onClick={() => setYearly(true)} className={`px-4 py-2 rounded-full text-sm transition-all ${yearly ? "bg-brand-600 text-white" : "text-gray-400"}`}>Yearly <span className="text-green-400 text-xs">Save 30%</span></button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className={`card relative ${plan.popular ? "border-brand-500 scale-105" : ""}`}>
              {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs px-4 py-1 rounded-full">Most Popular</div>}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>
              <div className="text-4xl font-bold mb-6">{yearly ? plan.price.yearly : plan.price.monthly}<span className="text-base text-gray-500 font-normal">/month</span></div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-300 text-sm"><span className="text-brand-400">✓</span>{f}</li>
                ))}
              </ul>
              <Link to="/register" className={`block text-center ${plan.popular ? "btn-primary" : "btn-secondary"}`}>{plan.cta}</Link>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 mt-8">✅ 14-day free trial · ✅ No credit card required · ✅ Cancel anytime</p>
      </div>
    </section>
  );
}
