import { useState } from "react";

const scenarios = [
  { id: "ecommerce", label: "🛒 E-Commerce", icon: "🛒" },
  { id: "service", label: "💼 Service", icon: "💼" },
  { id: "fnb", label: "🍕 F&B", icon: "🍕" },
];

const demoChats: Record<string, { user: string; ai: string; intent: string; score: number }[]> = {
  ecommerce: [
    { user: "Kak, sepatu size 42 ada?", ai: "Ada kak! Size 42 ready stock. Warna: Hitam, Putih, Navy. Harga Rp 349.000. Mau langsung order? 😊", intent: "PURCHASE_INQUIRY", score: 87 },
    { user: "Bisa kurang?", ai: "Untuk hari ini ada promo 10% kak, jadi Rp 314.100 + free ongkir Jabodetabek! 🚚", intent: "PRICE_CHECK", score: 92 },
    { user: "Oke checkout ya", ai: "Siap kak! 🎉 Terima kasih atas ordernya. Kami proses segera ya!", intent: "PURCHASE_INQUIRY", score: 100 },
  ],
  service: [
    { user: "Halo, jasa desain logo berapa?", ai: "Halo kak! 😊 Untuk desain logo mulai dari Rp 500.000. Sudah termasuk 3 revisi dan file vector. Mau lihat portofolio?", intent: "PRICE_CHECK", score: 75 },
    { user: "Bisa lihat contoh?", ai: "Tentu kak! Ini beberapa portofolio terbaru kami: [link]. Style mana yang kakak suka?", intent: "GENERAL_QUESTION", score: 80 },
    { user: "Suka yang minimalis. Bisa order?", ai: "Siap kak! Style minimalis favorit banget nih. Bisa langsung order, estimasi pengerjaan 3-5 hari kerja. Mau mulai sekarang? 🎨", intent: "PURCHASE_INQUIRY", score: 95 },
  ],
  fnb: [
    { user: "Mau pesen nasi goreng 2 porsi", ai: "Siap kak! 2 porsi nasi goreng. Mau level pedas berapa? Ada tambahan telur atau ayam? 🍳", intent: "PURCHASE_INQUIRY", score: 90 },
    { user: "Level 2, tambah telur", ai: "Oke kak! 2x Nasi Goreng Level 2 + Telur. Total Rp 56.000. Mau pakai GoFood/Grab atau ambil sendiri?", intent: "PURCHASE_INQUIRY", score: 95 },
    { user: "GoFood aja", ai: "Siap kak! Pesanan sudah diproses di GoFood. Estimasi 25-30 menit. Terima kasih! 🛵", intent: "PURCHASE_INQUIRY", score: 100 },
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
