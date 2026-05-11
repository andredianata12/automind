import { create } from "zustand";

interface MessageState {
  conversations: any[];
  activeConversation: any | null;
  messages: any[];
  loading: boolean;
  fetchConversations: () => Promise<void>;
  fetchMessages: (conversationId: number) => Promise<void>;
  setActiveConversation: (conv: any) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  conversations: [],
  activeConversation: null,
  messages: [],
  loading: false,

  fetchConversations: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/messages/conversations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      set({ conversations: data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  fetchMessages: async (conversationId) => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/messages/conversations/${conversationId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      set({ messages: data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  setActiveConversation: (conv) => set({ activeConversation: conv }),
}));
