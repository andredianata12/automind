import { create } from "zustand";
import { api } from "../utils/api";

export interface Conversation {
  id: number;
  platform: string;
  contact_id: string;
  contact_name: string | null;
  status: string;
  last_message_at: string;
  message_count: number;
  lead_score: number | null;
}

export interface Message {
  id: number;
  conversation_id: number;
  platform: string;
  sender_id: string;
  sender_name: string | null;
  content: string;
  direction: string;
  is_ai_reply: boolean;
  detected_intent: string | null;
  sentiment: string | null;
  created_at: string;
}

interface MessageState {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Message[];
  loading: boolean;
  sending: boolean;
  fetchConversations: (platform?: string) => Promise<void>;
  fetchMessages: (conversationId: number) => Promise<void>;
  setActiveConversation: (conv: Conversation) => void;
  sendMessage: (conversationId: number, content: string) => Promise<void>;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  conversations: [],
  activeConversation: null,
  messages: [],
  loading: false,
  sending: false,

  fetchConversations: async (platform?: string) => {
    set({ loading: true });
    try {
      const path = platform ? `/messages/conversations?platform=${platform}` : "/messages/conversations";
      const data = await api.get(path);
      set({ conversations: data, loading: false });
    } catch (err) {
      console.error("Failed to fetch conversations:", err);
      set({ loading: false });
    }
  },

  fetchMessages: async (conversationId) => {
    set({ loading: true });
    try {
      const data = await api.get(`/messages/conversations/${conversationId}/messages`);
      set({ messages: data, loading: false });
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      set({ loading: false });
    }
  },

  setActiveConversation: (conv) => {
    set({ activeConversation: conv });
    get().fetchMessages(conv.id);
  },

  sendMessage: async (conversationId, content) => {
    set({ sending: true });
    try {
      await api.post("/messages/send", { conversation_id: conversationId, content, override_ai: true });
      // Refresh messages
      await get().fetchMessages(conversationId);
      set({ sending: false });
    } catch (err) {
      console.error("Failed to send message:", err);
      set({ sending: false });
    }
  },
}));
