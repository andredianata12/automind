import { useEffect, useState } from "react";
import { api } from "../../utils/api";

export default function Analytics() {
  const [overview, setOverview] = useState<any>(null);
  const [platformStats, setPlatformStats] = useState<any>(null);
  const [intentBreakdown, setIntentBreakdown] = useState<any>(null);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [ov, ps, ib] = await Promise.all([
          api.get(`/analytics/overview?days=${days}`),
          api.get(`/analytics/platform-stats?days=${days}`),
          api.get(`/analytics/intent-breakdown?days=${days}`),
        ]);
        setOverview(ov);
        setPlatformStats(ps);
        setIntentBreakdown(ib);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [days]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-4xl mb-2 animate-pulse">📈</div>
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Total Messages", value: overview?.total_messages || 0, icon: "💬" },
    { label: "AI Handled", value: `${overview?.ai_handle_rate || 0}%`, icon: "🤖" },
    { label: "Incoming", value: overview?.incoming_messages || 0, icon: "📥" },
    { label: "Leads Generated", value: overview?.total_leads || 0, icon: "🔥" },
    { label: "Hot Leads", value: overview?.hot_leads || 0, icon: "🎯" },
    { label: "Conversion Rate", value: `${overview?.conversion_rate || 0}%`, icon: "📈" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">📈 Analytics</h1>
        <select className="input text-sm py-2" value={days} onChange={(e) => setDays(Number(e.target.value))}>
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="card text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-xl font-bold">{s.value}</div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Stats */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">🌐 Platform Breakdown</h3>
          {platformStats?.platforms && Object.keys(platformStats.platforms).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(platformStats.platforms).map(([platform, data]: [string, any]) => (
                <div key={platform} className="p-3 bg-gray-800 rounded-xl">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium capitalize">{platform}</span>
                    <span className="text-sm text-gray-400">{data.total} messages</span>
                  </div>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>📥 {data.incoming} incoming</span>
                    <span>🤖 {data.ai_replied} AI replied</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">No platform data yet</div>
          )}
        </div>

        {/* Intent Breakdown */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">🎯 Intent Breakdown</h3>
          {intentBreakdown?.intents && Object.keys(intentBreakdown.intents).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(intentBreakdown.intents)
                .sort(([, a]: [string, any], [, b]: [string, any]) => b.count - a.count)
                .map(([intent, data]: [string, any]) => (
                  <div key={intent}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">{intent.replace(/_/g, " ")}</span>
                      <span className="text-gray-300">{data.count} ({data.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-brand-500 h-2 rounded-full transition-all" style={{ width: `${data.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">No intent data yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
