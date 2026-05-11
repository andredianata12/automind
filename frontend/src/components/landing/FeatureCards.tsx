const features = [
  { icon: "🎯", title: "Intent Detection", desc: "AI reads context and understands customer intent — purchase, complaint, inquiry, or spam." },
  { icon: "🔥", title: "Lead Scoring", desc: "Score 0-100 based on 15+ factors. Hot leads get instant attention." },
  { icon: "🤖", title: "Auto Reply Engine", desc: "Personalized replies that match your brand voice. Sounds human, works 24/7." },
  { icon: "📊", title: "Analytics Dashboard", desc: "Real-time metrics, conversion tracking, and platform performance comparison." },
  { icon: "🔄", title: "Follow-Up Automation", desc: "Automatic follow-ups: warm leads after 2h, cold after 3 days. Never lose a sale." },
  { icon: "📚", title: "Knowledge Base", desc: "Upload products, FAQs, and catalog. AI uses this to give accurate answers." },
  { icon: "🌐", title: "Multi-Language", desc: "Indonesian, English, Malay, Chinese, Japanese. Auto-detects and responds in kind." },
  { icon: "🎓", title: "AI Learning", desc: "AI learns from your feedback. Approve, edit, or correct replies to improve over time." },
  { icon: "🔒", title: "Security & Privacy", desc: "End-to-end encrypted. Your data stays yours. SOC2-ready infrastructure." },
];

export default function FeatureCards() {
  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Smart Features That Actually Work</h2>
          <p className="text-gray-400 text-lg">Everything you need to automate business communication</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="card hover:border-brand-500/30 transition-all group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
