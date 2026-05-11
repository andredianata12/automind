export default function Settings() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">⚙️ Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">👤 Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Full Name</label>
              <input className="input w-full" defaultValue="Andre" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Business Name</label>
              <input className="input w-full" defaultValue="Toko Sepatu Andre" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input className="input w-full" defaultValue="andre@example.com" />
            </div>
            <button className="btn-primary text-sm">Save Profile</button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">🔔 Notifications</h2>
          <div className="space-y-3">
            {[
              { label: "Hot Lead Alert", desc: "Get notified for hot leads", on: true },
              { label: "Complaint Alert", desc: "Instant notification for complaints", on: true },
              { label: "Daily Summary", desc: "Daily report at 9 PM", on: false },
              { label: "Weekly Report", desc: "Weekly analytics summary", on: true },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between p-3 bg-gray-800 rounded-xl">
                <div>
                  <div className="text-sm font-medium">{n.label}</div>
                  <div className="text-xs text-gray-400">{n.desc}</div>
                </div>
                <div className={`w-12 h-6 rounded-full relative cursor-pointer ${n.on ? "bg-brand-600" : "bg-gray-700"}`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 ${n.on ? "right-0.5" : "left-0.5"}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plan */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">💎 Current Plan</h2>
          <div className="flex items-center justify-between p-4 bg-brand-600/10 border border-brand-500/20 rounded-xl">
            <div>
              <div className="text-xl font-bold text-brand-400">Growth Plan</div>
              <div className="text-sm text-gray-400">5 platforms · 5,000 messages/month</div>
            </div>
            <button className="btn-secondary text-sm">Upgrade</button>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Messages used</span>
              <span>3,247 / 5,000</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div className="bg-brand-500 h-2 rounded-full" style={{ width: "65%" }}></div>
            </div>
          </div>
        </div>

        {/* API Keys */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">🔑 API Keys</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">OpenAI API Key</label>
              <input type="password" className="input w-full" defaultValue="sk-xxxx" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Webhook URL</label>
              <div className="flex gap-2">
                <input className="input flex-1" defaultValue="https://api.automind.id/webhooks" readOnly />
                <button className="btn-secondary text-sm">Copy</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
