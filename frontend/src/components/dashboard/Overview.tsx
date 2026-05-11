import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { PieChartComponent, BarChartComponent } from "../shared/Chart";
import { useAuth } from "../../hooks/useAuth";

export default function Overview() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [leadStats, setLeadStats] = useState<any>(null);
  const [intentData, setIntentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [overview, leads, intents] = await Promise.all([
          api.get("/analytics/overview?days=7"),
          api.get("/leads/stats"),
          api.get("/analytics/intent-breakdown?days=7"),
        ]);
        setStats(overview);
        setLeadStats(leads);
        setIntentData(intents);
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

  const leadPieData = [
    { name: "Hot", value: leadStats?.hot || 0 },
    { name: "Warm", value: leadStats?.warm || 0 },
    { name: "Cold", value: leadStats?.cold || 0 },
    { name: "Non-Lead", value: leadStats?.non_lead || 0 },
  ].filter(d => d.value > 0);

  const intentBarData = intentData?.intents
    ? Object.entries(intentData.intents)
        .sort(([, a]: [string, any], [, b]: [string, any]) => b.count - a.count)
        .slice(0, 5)
        .map(([name, data]: [string, any]) => ({
          name: name.replace(/_/g, " "),
          value: data.count,
        }))
    : [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome back, {user?.full_name || user?.username || "User"}! 👋</h1>

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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Lead Distribution */}
        <div className="card">
          {leadPieData.length > 0 ? (
            <PieChartComponent data={leadPieData} title="🔥 Lead Distribution" />
          ) : (
            <div className="text-center text-gray-500 py-12">
              <div className="text-4xl mb-2">🔥</div>
              <p>No leads yet</p>
              <p className="text-sm mt-1">Connect a platform to start receiving leads</p>
            </div>
          )}
        </div>

        {/* Top Intents */}
        <div className="card">
          {intentBarData.length > 0 ? (
            <BarChartComponent data={intentBarData} title="🎯 Top Intents" />
          ) : (
            <div className="text-center text-gray-500 py-12">
              <div className="text-4xl mb-2">🎯</div>
              <p>No intent data yet</p>
              <p className="text-sm mt-1">AI will analyze intents from incoming messages</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">📊 Lead Summary</h3>
          <div className="space-y-3">
            {[
              { label: "Total Leads", value: leadStats?.total || 0, color: "text-white" },
              { label: "Average Score", value: leadStats?.avg_score?.toFixed(1) || "0.0", color: "text-brand-400" },
              { label: "Hot Leads", value: leadStats?.hot || 0, color: "text-red-400" },
              { label: "Warm Leads", value: leadStats?.warm || 0, color: "text-yellow-400" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between p-3 bg-gray-800 rounded-xl">
                <span className="text-gray-400 text-sm">{item.label}</span>
                <span className={`font-semibold ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">🤖 AI Performance</h3>
          <div className="space-y-3">
            {[
              { label: "Messages Processed", value: stats?.total_messages || 0 },
              { label: "AI Reply Rate", value: `${stats?.ai_handle_rate || 0}%` },
              { label: "Incoming Messages", value: stats?.incoming_messages || 0 },
              { label: "AI Replied", value: stats?.ai_replied || 0 },
            ].map((item) => (
              <div key={item.label} className="flex justify-between p-3 bg-gray-800 rounded-xl">
                <span className="text-gray-400 text-sm">{item.label}</span>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">🚀 Quick Actions</h3>
          <div className="space-y-3">
            <a href="#platforms" className="block p-3 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors">
              <div className="font-medium text-sm">🔗 Connect Platform</div>
              <div className="text-xs text-gray-400">Add WhatsApp, Telegram, etc.</div>
            </a>
            <a href="#knowledge" className="block p-3 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors">
              <div className="font-medium text-sm">📚 Add Products</div>
              <div className="text-xs text-gray-400">Upload your product catalog</div>
            </a>
            <a href="#brain" className="block p-3 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors">
              <div className="font-medium text-sm">🧠 Configure AI</div>
              <div className="text-xs text-gray-400">Set brand voice & behavior</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
