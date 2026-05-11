import { useState, useEffect } from "react";
import { useMessageStore } from "../../store/messageStore";
import { timeAgo } from "../../utils/formatters";

export default function MessageInbox() {
  const {
    conversations,
    activeConversation,
    messages,
    loading,
    sending,
    fetchConversations,
    setActiveConversation,
    sendMessage,
  } = useMessageStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");

  useEffect(() => {
    fetchConversations(platformFilter || undefined);
  }, [fetchConversations, platformFilter]);

  // Auto-select first conversation
  useEffect(() => {
    if (conversations.length > 0 && !activeConversation) {
      setActiveConversation(conversations[0]);
    }
  }, [conversations, activeConversation, setActiveConversation]);

  const filteredConversations = conversations.filter(
    (c) =>
      !searchQuery ||
      c.contact_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contact_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = async () => {
    if (!newMessage.trim() || !activeConversation) return;
    await sendMessage(activeConversation.id, newMessage.trim());
    setNewMessage("");
  };

  const tierColor = (score: number | null) => {
    if (!score) return "bg-gray-500/20 text-gray-400";
    if (score >= 80) return "bg-red-500/20 text-red-400";
    if (score >= 50) return "bg-yellow-500/20 text-yellow-400";
    return "bg-blue-500/20 text-blue-400";
  };

  const tierIcon = (score: number | null) => {
    if (!score) return "⚪";
    if (score >= 80) return "🔥";
    if (score >= 50) return "🟡";
    return "🔵";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">💬 All Messages</h1>
        <select
          className="input text-sm py-2"
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
        >
          <option value="">All Platforms</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="instagram">Instagram</option>
          <option value="telegram">Telegram</option>
          <option value="shopee">Shopee</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
        {/* Conversation list */}
        <div className="card overflow-auto">
          <input
            className="input w-full mb-4 text-sm"
            placeholder="🔍 Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {loading && conversations.length === 0 ? (
            <div className="text-center text-gray-500 py-8">Loading...</div>
          ) : filteredConversations.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No conversations yet</div>
          ) : (
            <div className="space-y-2">
              {filteredConversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveConversation(c)}
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    activeConversation?.id === c.id
                      ? "bg-brand-600/10 border border-brand-500/20"
                      : "bg-gray-800 hover:bg-gray-750"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{c.contact_name || c.contact_id}</span>
                    <span className="text-xs text-gray-500">{timeAgo(c.last_message_at)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{c.platform}</span>
                    {c.lead_score !== null && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${tierColor(c.lead_score)}`}>
                        {tierIcon(c.lead_score)} {c.lead_score}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Chat view */}
        <div className="lg:col-span-2 card flex flex-col">
          {activeConversation ? (
            <>
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div>
                  <div className="font-semibold">{activeConversation.contact_name || activeConversation.contact_id}</div>
                  <div className="text-xs text-gray-400">
                    {activeConversation.platform}
                    {activeConversation.lead_score !== null && ` · Lead Score: ${tierIcon(activeConversation.lead_score)} ${activeConversation.lead_score}`}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-4 space-y-4">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.direction === "incoming" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        m.direction === "incoming"
                          ? "bg-brand-600 text-white"
                          : "bg-gray-800 text-gray-200"
                      }`}
                    >
                      {m.is_ai_reply && <div className="text-xs text-brand-400 mb-1">🤖 AutoMind AI</div>}
                      <p className="text-sm">{m.content}</p>
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-xs text-gray-500">
                          {new Date(m.created_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                        {m.detected_intent && (
                          <span className="text-xs opacity-60">{m.detected_intent}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-800">
                <div className="flex gap-2">
                  <input
                    className="input flex-1 text-sm"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                  <button
                    className="btn-primary text-sm py-2 px-4"
                    onClick={handleSend}
                    disabled={sending || !newMessage.trim()}
                  >
                    {sending ? "..." : "Send"}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-2">💬</div>
                <p>Select a conversation to start</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
