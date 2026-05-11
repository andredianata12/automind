import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { BarChartComponent, PieChartComponent } from "../shared/Chart";

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

  // Prepare chart data
  const platformChartData = platformStats?.platforms
    ? Object.entries(platformStats.platforms).map(([name, data]: [string, any]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value: data.total,
      }))
    : [];

  const intentChartData = intentBreakdown?.intents
    ? Object.entries(intentBreakdown.intents)
        .sort(([, a]: [string, any], [, b]: [string, any]) => b.count - a.count)
        .map(([name, data]: [string, any]) => ({
          name: name.replace(/_/g, " "),
          value: data.count,
        }))
    : [];

  const platformBarData = platformStats?.platforms
    ? Object.entries(platformStats.platforms).map(([name, data]: [string, any]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        Incoming: data.incoming,
        "AI Replied": data.ai_replied,
      }))
    : [];

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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Platform Distribution Pie */}
        <div className="card">
          {platformChartData.length > 0 ? (
            <PieChartComponent data={platformChartData} title="🌐 Platform Distribution" />
          ) : (
            <div className="text-center text-gray-500 py-12">
              <div className="text-4xl mb-2">🌐</div>
              <p>No platform data yet</p>
              <p className="text-sm mt-1">Connect a platform to see stats</p>
            </div>
          )}
        </div>

        {/* Intent Distribution Pie */}
        <div className="card">
          {intentChartData.length > 0 ? (
            <PieChartComponent data={intentChartData} title="🎯 Intent Breakdown" />
          ) : (
            <div className="text-center text-gray-500 py-12">
              <div className="text-4xl mb-2">🎯</div>
              <p>No intent data yet</p>
              <p className="text-sm mt-1">Receive messages to see intents</p>
            </div>
          )}
        </div>
      </div>

      {/* Platform Bar Chart */}
      <div className="card mb-6">
        {platformBarData.length > 0 ? (
          <BarChartComponent data={platformBarData} title="📊 Messages by Platform" />
        ) : (
          <div className="text-center text-gray-500 py-12">
            <div className="text-4xl mb-2">📊</div>
            <p>No message data yet</p>
          </div>
        )}
      </div>

      {/* Platform Details */}
      {platformStats?.platforms && Object.keys(platformStats.platforms).length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">📋 Platform Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(platformStats.platforms).map(([platform, data]: [string, any]) => (
              <div key={platform} className="p-4 bg-gray-800 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">
                    {platform === "whatsapp" ? "💬" : platform === "instagram" ? "📸" : platform === "telegram" ? "✈️" : platform === "shopee" ? "🛒" : "🌐"}
                  </span>
                  <span className="font-semibold capitalize">{platform}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Total: <span className="text-white font-medium">{data.total}</span></div>
                  <div className="text-gray-400">Incoming: <span className="text-white font-medium">{data.incoming}</span></div>
                  <div className="text-gray-400">AI Replied: <span className="text-green-400 font-medium">{data.ai_replied}</span></div>
                  <div className="text-gray-400">AI Rate: <span className="text-brand-400 font-medium">
                    {data.incoming > 0 ? Math.round((data.ai_replied / data.incoming) * 100) : 0}%
                  </span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
