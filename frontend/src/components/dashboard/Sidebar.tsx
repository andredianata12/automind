const navItems = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "messages", label: "Messages", icon: "💬" },
  { id: "leads", label: "Leads", icon: "🔥" },
  { id: "brain", label: "AI Brain", icon: "🧠" },
  { id: "knowledge", label: "Knowledge Base", icon: "📚" },
  { id: "platforms", label: "Platforms", icon: "🔗" },
  { id: "analytics", label: "Analytics", icon: "📈" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

interface Props {
  activePage: string;
  onNavigate: (page: string) => void;
}

import { useAuth } from "../../hooks/useAuth";

export default function Sidebar({ activePage, onNavigate }: Props) {
  const { user, logout } = useAuth();
  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 p-4 flex flex-col">
      <div className="text-2xl font-bold text-brand-400 mb-8 px-2">🤖 AutoMind</div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
              activePage === item.id
                ? "bg-brand-600/10 text-brand-400 border border-brand-500/20"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            <span>{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto p-4 bg-gray-800 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center text-white font-bold">
            {(user?.username || "U")[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{user?.full_name || user?.username || "User"}</div>
            <div className="text-xs text-gray-400 capitalize">{user?.plan || "starter"} Plan</div>
          </div>
          <button onClick={logout} className="text-gray-500 hover:text-red-400 text-xs" title="Logout">⏻</button>
        </div>
      </div>
    </aside>
  );
}
