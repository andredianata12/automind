const leads = [
  { id: 1, name: "@andi_shop", platform: "Shopee", score: 92, tier: "hot", intent: "PURCHASE", status: "new", time: "2m ago" },
  { id: 2, name: "@maya_tg", platform: "Telegram", score: 78, tier: "warm", intent: "COLLAB", status: "contacted", time: "1h ago" },
  { id: 3, name: "@sarah_ig", platform: "Instagram", score: 65, tier: "warm", intent: "PRICE_CHECK", status: "new", time: "3h ago" },
  { id: 4, name: "@budi_wa", platform: "WhatsApp", score: 45, tier: "cold", intent: "GENERAL", status: "new", time: "5h ago" },
  { id: 5, name: "@rina_shop", platform: "Shopee", score: 88, tier: "hot", intent: "PURCHASE", status: "qualified", time: "1d ago" },
];

export default function LeadBoard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">🔥 Lead Board</h1>
        <div className="flex gap-2">
          <select className="input text-sm py-2">
            <option>All Tiers</option>
            <option>🔥 Hot</option>
            <option>🟡 Warm</option>
            <option>🔵 Cold</option>
          </select>
          <select className="input text-sm py-2">
            <option>All Platforms</option>
            <option>WhatsApp</option>
            <option>Instagram</option>
            <option>Shopee</option>
            <option>Telegram</option>
          </select>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Leads", value: "156", color: "text-white" },
          { label: "🔥 Hot", value: "23", color: "text-red-400" },
          { label: "🟡 Warm", value: "48", color: "text-yellow-400" },
          { label: "🔵 Cold", value: "85", color: "text-blue-400" },
        ].map((s) => (
          <div key={s.label} className="card text-center">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Lead table */}
      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 text-left border-b border-gray-800">
              <th className="pb-3 pr-4">Contact</th>
              <th className="pb-3 pr-4">Platform</th>
              <th className="pb-3 pr-4">Score</th>
              <th className="pb-3 pr-4">Intent</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 cursor-pointer">
                <td className="py-3 pr-4 font-medium">{l.name}</td>
                <td className="py-3 pr-4 text-gray-400">{l.platform}</td>
                <td className="py-3 pr-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${l.tier === "hot" ? "bg-red-500/20 text-red-400" : l.tier === "warm" ? "bg-yellow-500/20 text-yellow-400" : "bg-blue-500/20 text-blue-400"}`}>
                    {l.tier === "hot" ? "🔥" : l.tier === "warm" ? "🟡" : "🔵"} {l.score}
                  </span>
                </td>
                <td className="py-3 pr-4 text-gray-400">{l.intent}</td>
                <td className="py-3 pr-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300">{l.status}</span>
                </td>
                <td className="py-3 text-gray-500">{l.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
