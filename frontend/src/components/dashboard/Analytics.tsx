const stats = [
  { label: "Total Messages", value: "15,847", change: "+12%" },
  { label: "AI Handled", value: "12,340 (78%)", change: "+5%" },
  { label: "Leads Generated", value: "1,234", change: "+18%" },
  { label: "Conversions", value: "156", change: "+23%" },
  { label: "Avg Response Time", value: "0.8s", change: "-47min" },
  { label: "Customer Satisfaction", value: "4.8/5", change: "+0.3" },
];

export default function Analytics() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">📈 Analytics</h1>
        <select className="input text-sm py-2">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="card">
            <div className="text-gray-400 text-sm mb-1">{s.label}</div>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-green-400 text-xs mt-1">{s.change}</div>
          </div>
        ))}
      </div>

      {/* Charts placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">📊 Message Volume Trend</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <p>Chart will render here with Recharts</p>
              <p className="text-sm">Install: npm install recharts</p>
            </div>
          </div>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">🥧 Intent Breakdown</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-2">🥧</div>
              <p>Pie chart will render here</p>
              <p className="text-sm">Price: 34% | Purchase: 28% | General: 19%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
