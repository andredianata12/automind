import { useEffect, useState } from "react";
import { api } from "../../utils/api";

export default function Overview() {
  const [stats, setStats] = useState<any>(null);
  const [leadStats, setLeadStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [overview, leads] = await Promise.all([
          api.get("/analytics/overview?days=7"),
          api.get("/leads/stats"),
        ]);
        setStats(overview);
        setLeadStats(leads);
      } catch (err) {
        console.error("Failed to fetch overview:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-4xl mb-2 animate-pulse">📊</div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { label: "Messages This Week", value: stats?.total_messages || 0, color: "text-brand-400", icon: "💬" },
    { label: "AI Handled", value: `${stats?.ai_handle_rate || 0}%`, color: "text-green-400", icon: "🤖" },
    { label: "Hot Leads", value: leadStats?.hot || 0, color: "text-red-400", icon: "🔥" },
    { label: "Conversion Rate", value: `${stats?.conversion_rate || 0}%`, color: "text-purple-400", icon: "📈" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">📊 Dashboard Overview</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s) => (
          <div key={s.label} className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">{s.label}</span>
              <span className="text-2xl">{s.icon}</span>
            </div>
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Lead breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">🔥 Lead Distribution</h3>
          <div className="space-y-4">
            {[
              { label: "🔥 Hot Leads", value: leadStats?.hot || 0, color: "bg-red-500" },
              { label: "🟡 Warm Leads", value: leadStats?.warm || 0, color: "bg-yellow-500" },
              { label: "🔵 Cold Leads", value: leadStats?.cold || 0, color: "bg-blue-500" },
              { label: "⚪ Non-Leads", value: leadStats?.non_lead || 0, color: "bg-gray-500" },
            ].map((item) => {
              const total = leadStats?.total || 1;
              const pct = Math.round((item.value / total) * 100);
              return (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-gray-300">{item.value} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">📊 Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-gray-800 rounded-xl">
              <span className="text-gray-400">Total Leads</span>
              <span className="font-semibold">{leadStats?.total || 0}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-800 rounded-xl">
              <span className="text-gray-400">Average Score</span>
              <span className="font-semibold">{leadStats?.avg_score?.toFixed(1) || "0.0"}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-800 rounded-xl">
              <span className="text-gray-400">AI Handle Rate</span>
              <span className="font-semibold text-green-400">{stats?.ai_handle_rate || 0}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
