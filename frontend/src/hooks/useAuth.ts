import { create } from "zustand";

interface User {
  id: number;
  username: string;
  email: string;
  full_name: string | null;
  business_name: string | null;
  plan: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

interface RegisterData {
  email: string;
  username: string;
  password: string;
  full_name?: string;
  business_name?: string;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: false,

  fetchUser: async () => {
    const token = get().token;
    if (!token) return;
    set({ loading: true });
    try {
      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        // Token expired or invalid
        localStorage.removeItem("token");
        set({ user: null, token: null, loading: false });
        return;
      }
      const user = await res.json();
      set({ user, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  login: async (username, password) => {
    set({ loading: true });
    const form = new URLSearchParams();
    form.append("username", username);
    form.append("password", password);

    const res = await fetch("/api/auth/login", { method: "POST", body: form });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: "Login failed" }));
      set({ loading: false });
      throw new Error(err.detail || "Login failed");
    }
    const data = await res.json();
    localStorage.setItem("token", data.access_token);
    set({ token: data.access_token });

    // Fetch user data immediately after login
    const userRes = await fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });
    if (userRes.ok) {
      const user = await userRes.json();
      set({ user, loading: false });
    } else {
      set({ loading: false });
    }
  },

  register: async (formData) => {
    set({ loading: true });
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: "Registration failed" }));
      set({ loading: false });
      throw new Error(err.detail || "Registration failed");
    }
    set({ loading: false });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
