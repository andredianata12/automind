import { useState } from "react";

const conversations = [
  { id: 1, name: "@andi_shop", platform: "Shopee", preview: "Kak, sepatu size 42 ada?", time: "2m", score: 87, tier: "hot" },
  { id: 2, name: "@sarah_ig", platform: "Instagram", preview: "Berapa harga tas itu?", time: "15m", score: 65, tier: "warm" },
  { id: 3, name: "@budi_wa", platform: "WhatsApp", preview: "Info pengiriman dong", time: "1h", score: 35, tier: "cold" },
  { id: 4, name: "@maya_tg", platform: "Telegram", preview: "Mau collab nih!", time: "2h", score: 72, tier: "warm" },
];

const messages = [
  { sender: "customer", text: "Kak, sepatu size 42 ada?", time: "10:30" },
  { sender: "ai", text: "Ada kak! Size 42 ready stock. Warna: Hitam, Putih, Navy. Harga Rp 349.000. Mau langsung order? 😊", time: "10:30" },
  { sender: "customer", text: "Bisa kurang?", time: "10:31" },
  { sender: "ai", text: "Untuk hari ini ada promo 10% kak, jadi Rp 314.100 + free ongkir Jabodetabek! 🚚", time: "10:31" },
  { sender: "customer", text: "Oke checkout ya", time: "10:32" },
  { sender: "ai", text: "Siap kak! 🎉 Terima kasih atas ordernya. Kami proses segera ya!", time: "10:32" },
];

export default function MessageInbox() {
  const [activeConv, setActiveConv] = useState(1);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">💬 All Messages</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
        {/* Conversation list */}
        <div className="card overflow-auto">
          <input className="input w-full mb-4 text-sm" placeholder="🔍 Search messages..." />
          <div className="space-y-2">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveConv(c.id)}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  activeConv === c.id ? "bg-brand-600/10 border border-brand-500/20" : "bg-gray-800 hover:bg-gray-750"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{c.name}</span>
                  <span className="text-xs text-gray-500">{c.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 truncate">{c.preview}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${c.tier === "hot" ? "bg-red-500/20 text-red-400" : c.tier === "warm" ? "bg-yellow-500/20 text-yellow-400" : "bg-blue-500/20 text-blue-400"}`}>
                    {c.score}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat view */}
        <div className="lg:col-span-2 card flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div>
              <div className="font-semibold">@andi_shop</div>
              <div className="text-xs text-gray-400">Shopee · Lead Score: 🔥 87</div>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary text-xs py-1 px-3">Escalate</button>
              <button className="btn-secondary text-xs py-1 px-3">Block</button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === "customer" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${m.sender === "customer" ? "bg-brand-600 text-white" : "bg-gray-800 text-gray-200"}`}>
                  {m.sender === "ai" && <div className="text-xs text-brand-400 mb-1">🤖 AutoMind AI</div>}
                  <p className="text-sm">{m.text}</p>
                  <div className="text-xs text-gray-500 mt-1 text-right">{m.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-800">
            <div className="flex gap-2">
              <input className="input flex-1 text-sm" placeholder="Override AI reply..." />
              <button className="btn-primary text-sm py-2 px-4">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
