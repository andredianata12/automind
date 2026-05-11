const platforms = [
  { name: "WhatsApp Business", status: "connected", contacts: 1234, messages: 5670, icon: "💬" },
  { name: "Instagram DM", status: "connected", contacts: 890, messages: 3420, icon: "📸" },
  { name: "Telegram Bot", status: "connected", contacts: 456, messages: 1890, icon: "✈️" },
  { name: "Shopee Chat", status: "syncing", contacts: 2100, messages: 8900, icon: "🛒" },
  { name: "Tokopedia Chat", status: "disconnected", contacts: 0, messages: 0, icon: "🟢" },
  { name: "Website Widget", status: "disconnected", contacts: 0, messages: 0, icon: "🌐" },
  { name: "Discord", status: "disconnected", contacts: 0, messages: 0, icon: "🎮" },
  { name: "LINE Official", status: "disconnected", contacts: 0, messages: 0, icon: "🟢" },
];

export default function PlatformManager() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">🔗 Connected Platforms</h1>
        <button className="btn-primary text-sm">+ Connect New Platform</button>
      </div>

      <div className="space-y-4">
        {platforms.map((p) => (
          <div key={p.name} className="card flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-3xl">{p.icon}</span>
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-gray-400">
                  {p.status === "connected" && `${p.contacts.toLocaleString()} contacts · ${p.messages.toLocaleString()} messages`}
                  {p.status === "syncing" && "Syncing..."}
                  {p.status === "disconnected" && "Not connected"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-3 py-1 rounded-full ${
                p.status === "connected" ? "bg-green-500/20 text-green-400" :
                p.status === "syncing" ? "bg-yellow-500/20 text-yellow-400" :
                "bg-gray-700 text-gray-400"
              }`}>
                {p.status}
              </span>
              {p.status === "disconnected" ? (
                <button className="btn-primary text-xs py-1.5 px-3">Connect</button>
              ) : (
                <button className="btn-secondary text-xs py-1.5 px-3">Settings</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
