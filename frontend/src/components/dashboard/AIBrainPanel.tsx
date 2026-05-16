export default function AIBrainPanel() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">🧠 AI Brain Configuration</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Voice */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">🎨 Brand Voice</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Business Name</label>
              <input className="input w-full" defaultValue="Andre's Shoe Store" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Greeting Message</label>
              <input className="input w-full" defaultValue="Hi there! 😊 How can we help you?" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Signature</label>
              <input className="input w-full" defaultValue="Is there anything else I can help with? 😊" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Tone</label>
              <div className="flex gap-2">
                {["Friendly", "Professional", "Casual", "Formal"].map((t) => (
                  <button key={t} className="px-3 py-1.5 rounded-lg text-sm bg-brand-600/20 text-brand-400 border border-brand-500/20">{t}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Settings */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">⚙️ AI Behavior</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-xl">
              <div>
                <div className="text-sm font-medium">Auto-Reply</div>
                <div className="text-xs text-gray-400">AI automatically replies to messages</div>
              </div>
              <div className="w-12 h-6 bg-brand-600 rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-xl">
              <div>
                <div className="text-sm font-medium">Escalate Complaints</div>
                <div className="text-xs text-gray-400">Send complaints to human immediately</div>
              </div>
              <div className="w-12 h-6 bg-brand-600 rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-xl">
              <div>
                <div className="text-sm font-medium">Follow-Up Automation</div>
                <div className="text-xs text-gray-400">Auto follow-up with leads</div>
              </div>
              <div className="w-12 h-6 bg-gray-700 rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-gray-400 rounded-full absolute left-0.5 top-0.5"></div>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Confidence Threshold</label>
              <input type="range" min="0" max="100" defaultValue="70" className="w-full" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Low (reply to all)</span>
                <span>70%</span>
                <span>High (only confident)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Instructions */}
        <div className="card lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">📝 Custom Instructions</h2>
          <textarea className="input w-full h-32 resize-none" defaultValue="Always mention ongoing promotions. Never share competitor prices. For size inquiries, always suggest checking the size chart first."></textarea>
          <div className="flex justify-end mt-4">
            <button className="btn-primary text-sm">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
