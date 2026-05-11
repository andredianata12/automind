import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  LineChart, Line,
  AreaChart, Area,
} from "recharts";

const COLORS = ["#3b82f6", "#ef4444", "#eab308", "#22c55e", "#a855f7", "#ec4899", "#14b8a6", "#f97316"];

// Bar Chart
interface BarChartData {
  name: string;
  [key: string]: any;
}

interface BarConfig {
  key: string;
  color: string;
}

export function BarChartComponent({ data, bars, title, height = 300 }: { data: BarChartData[]; bars?: BarConfig[]; title: string; height?: number }) {
  // If no bars config, auto-detect numeric keys (excluding 'name')
  const barConfigs = bars || Object.keys(data[0] || {})
    .filter(k => k !== "name" && typeof data[0]?.[k] === "number")
    .map((k, i) => ({ key: k, color: COLORS[i % COLORS.length] }));

  return (
    <div>
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
          <YAxis stroke="#9ca3af" fontSize={12} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "12px" }}
            labelStyle={{ color: "#f3f4f6" }}
          />
          {barConfigs.map((bar) => (
            <Bar key={bar.key} dataKey={bar.key} fill={bar.color} radius={[6, 6, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Pie Chart
interface PieChartData {
  name: string;
  value: number;
}

export function PieChartComponent({ data, title, height = 300 }: { data: PieChartData[]; title: string; height?: number }) {
  return (
    <div>
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "12px" }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Line Chart
interface LineChartData {
  name: string;
  [key: string]: any;
}

export function LineChartComponent({ data, lines, title, height = 300 }: { data: LineChartData[]; lines: { key: string; color: string }[]; title: string; height?: number }) {
  return (
    <div>
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
          <YAxis stroke="#9ca3af" fontSize={12} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "12px" }}
          />
          {lines.map((line) => (
            <Line key={line.key} type="monotone" dataKey={line.key} stroke={line.color} strokeWidth={2} dot={{ r: 4 }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Area Chart
export function AreaChartComponent({ data, areas, title, height = 300 }: { data: any[]; areas: { key: string; color: string }[]; title: string; height?: number }) {
  return (
    <div>
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
          <YAxis stroke="#9ca3af" fontSize={12} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "12px" }}
          />
          {areas.map((area) => (
            <Area key={area.key} type="monotone" dataKey={area.key} stroke={area.color} fill={area.color} fillOpacity={0.1} />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
