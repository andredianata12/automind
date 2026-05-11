const platforms = [
  { name: "WhatsApp", icon: "💬", category: "Chat" },
  { name: "Telegram", icon: "✈️", category: "Chat" },
  { name: "Instagram", icon: "📸", category: "Chat" },
  { name: "Twitter/X", icon: "🐦", category: "Chat" },
  { name: "Facebook", icon: "👤", category: "Chat" },
  { name: "LINE", icon: "🟢", category: "Chat" },
  { name: "Discord", icon: "🎮", category: "Chat" },
  { name: "Shopee", icon: "🛒", category: "E-Commerce" },
  { name: "Tokopedia", icon: "🟢", category: "E-Commerce" },
  { name: "Lazada", icon: "🔵", category: "E-Commerce" },
  { name: "TikTok Shop", icon: "🎵", category: "E-Commerce" },
  { name: "Bukalapak", icon: "🔴", category: "E-Commerce" },
  { name: "Website", icon: "🌐", category: "Web" },
  { name: "WordPress", icon: "📝", category: "Web" },
  { name: "Slack", icon: "💼", category: "Web" },
  { name: "Email", icon: "📧", category: "Web" },
];

export default function PlatformShowcase() {
  return (
    <section id="platforms" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Works Everywhere Your Customers Are</h2>
          <p className="text-gray-400 text-lg">Connect all your business channels in minutes</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {platforms.map((p) => (
            <div key={p.name} className="card text-center hover:border-brand-500/50 transition-all cursor-pointer group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{p.icon}</div>
              <div className="text-sm font-medium text-gray-300">{p.name}</div>
              <div className="text-xs text-gray-500">{p.category}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
