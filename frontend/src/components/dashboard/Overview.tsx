const stats = [
  { label: "Messages Today", value: "247", change: "+12%", color: "text-brand-400" },
  { label: "New Leads", value: "18", change: "+8%", color: "text-orange-400" },
  { label: "Conversion Rate", value: "12.4%", change: "+2.1%", color: "text-green-400" },
  { label: "Time Saved", value: "47min", change: "+15min", color: "text-purple-400" },
];

const recentConversations = [
  { name: "@andi_shop", platform: "Shopee", preview: "Mau beli sepatu...", score: 87, tier: "hot", time: "2m" },
  { name: "@sarah_ig", platform: "Instagram", preview: "Berapa harga...", score: 65, tier: "warm", time: "15m" },
  { name: "@budi_wa", platform: "WhatsApp", preview: "Info produk dong...", score: 35, tier: "cold", time: "1h" },
  { name: "@bot_spam", platform: "Telegram", preview: "FREE CRYPTO...", score: 0, tier: "non_lead", time: "3h" },
];

export default function Overview() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome back, Andre! 👋</h1>
      
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="card">
            <div className="text-gray-400 text-sm mb-1">{s.label}</div>
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-green-400 text-xs mt-1">{s.change} vs yesterday</div>
          </div>
        ))}
      </div>

      {/* Recent Conversations */}
      <div className="card mb-8">
        <h2 className="text-lg font-semibold mb-4">💬 Recent Conversations</h2>
        <div className="space-y-3">
          {recentConversations.map((c) => (
            <div key={c.name} className="flex items-center justify-between p-3 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${c.tier === "hot" ? "bg-red-500" : c.tier === "warm" ? "bg-yellow-500" : c.tier === "cold" ? "bg-blue-500" : "bg-gray-500"}`}></span>
                <div>
                  <div className="font-medium text-sm">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.platform} · {c.time} ago</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-300">{c.preview}</div>
                <div className="text-xs text-gray-500">Score: {c.score}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">🎯 Top Intents Today</h3>
          <div className="space-y-3">
            {[
              { intent: "Price Check", pct: 34 },
              { intent: "Purchase", pct: 28 },
              { intent: "General", pct: 19 },
              { intent: "Complaint", pct: 11 },
            ].map((i) => (
              <div key={i.intent}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{i.intent}</span>
                  <span className="text-gray-300">{i.pct}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-brand-500 h-2 rounded-full" style={{ width: `${i.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">🌐 Platform Stats</h3>
          <div className="space-y-3">
            {[
              { platform: "WhatsApp", pct: 45, icon: "💬" },
              { platform: "Instagram", pct: 30, icon: "📸" },
              { platform: "Telegram", pct: 15, icon: "✈️" },
              { platform: "Shopee", pct: 10, icon: "🛒" },
            ].map((p) => (
              <div key={p.platform}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{p.icon} {p.platform}</span>
                  <span className="text-gray-300">{p.pct}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${p.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
