const testimonials = [
  {
    name: "Sarah K.",
    business: "Fashion Store Owner",
    text: "AutoMind changed my business! I used to spend 4 hours daily replying to DMs. Now AI handles 90% and I only step in for complex cases. Sales went up 35%!",
    avatar: "👩",
    platform: "Shopee + Instagram",
  },
  {
    name: "Budi S.",
    business: "Restaurant Chain",
    text: "Managing orders across WhatsApp, Grab, and GoFood was a nightmare. AutoMind unified everything. Our response time dropped from 15 minutes to 8 seconds!",
    avatar: "👨",
    platform: "WhatsApp + GoFood",
  },
  {
    name: "Maya L.",
    business: "Digital Agency",
    text: "We use AutoMind for our clients\' social media accounts. The AI learns each brand\'s voice perfectly. ROI is insane — 10x cheaper than hiring a team.",
    avatar: "👩‍💼",
    platform: "Instagram + Facebook + Telegram",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Loved by 2,000+ Businesses</h2>
          <p className="text-gray-400 text-lg">See what our customers are saying</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="card">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{t.avatar}</span>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-gray-400">{t.business}</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">"{t.text}"</p>
              <div className="text-xs text-brand-400">{t.platform}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
