import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { timeAgo } from "../../utils/formatters";

interface Lead {
  id: number;
  contact_id: string;
  contact_name: string | null;
  platform: string;
  score: number;
  tier: string;
  primary_intent: string | null;
  sentiment: string | null;
  status: string;
  follow_up_count: number;
  created_at: string;
}

export default function LeadBoard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tierFilter, setTierFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();
        if (tierFilter) params.append("tier", tierFilter);
        if (platformFilter) params.append("platform", platformFilter);

        const [leadsData, statsData] = await Promise.all([
          api.get(`/leads?${params.toString()}`),
          api.get("/leads/stats"),
        ]);
        setLeads(leadsData);
        setStats(statsData);
      } catch (err) {
        console.error("Failed to fetch leads:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tierFilter, platformFilter]);

  const tierIcon = (tier: string) => {
    if (tier === "hot") return "🔥";
    if (tier === "warm") return "🟡";
    if (tier === "cold") return "🔵";
    return "⚪";
  };

  const tierColor = (tier: string) => {
    if (tier === "hot") return "bg-red-500/20 text-red-400";
    if (tier === "warm") return "bg-yellow-500/20 text-yellow-400";
    if (tier === "cold") return "bg-blue-500/20 text-blue-400";
    return "bg-gray-700 text-gray-400";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-4xl mb-2 animate-pulse">🔥</div>
          <p className="text-gray-400">Loading leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">🔥 Lead Board</h1>
        <div className="flex gap-2">
          <select className="input text-sm py-2" value={tierFilter} onChange={(e) => setTierFilter(e.target.value)}>
            <option value="">All Tiers</option>
            <option value="hot">🔥 Hot</option>
            <option value="warm">🟡 Warm</option>
            <option value="cold">🔵 Cold</option>
          </select>
          <select className="input text-sm py-2" value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)}>
            <option value="">All Platforms</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="instagram">Instagram</option>
            <option value="telegram">Telegram</option>
            <option value="shopee">Shopee</option>
          </select>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Leads", value: stats?.total || 0, color: "text-white" },
          { label: "🔥 Hot", value: stats?.hot || 0, color: "text-red-400" },
          { label: "🟡 Warm", value: stats?.warm || 0, color: "text-yellow-400" },
          { label: "🔵 Cold", value: stats?.cold || 0, color: "text-blue-400" },
        ].map((s) => (
          <div key={s.label} className="card text-center">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Lead table */}
      <div className="card overflow-auto">
        {leads.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No leads yet. Connect a platform to start receiving messages!</div>
        ) : (
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
                  <td className="py-3 pr-4 font-medium">{l.contact_name || l.contact_id}</td>
                  <td className="py-3 pr-4 text-gray-400">{l.platform}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${tierColor(l.tier)}`}>
                      {tierIcon(l.tier)} {l.score}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-gray-400">{l.primary_intent || "-"}</td>
                  <td className="py-3 pr-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300">{l.status}</span>
                  </td>
                  <td className="py-3 text-gray-500">{timeAgo(l.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
