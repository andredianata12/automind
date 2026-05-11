import { create } from "zustand";

interface AuthState {
  user: { username: string; email: string; plan: string } | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  
  login: async (username, password) => {
    const form = new URLSearchParams();
    form.append("username", username);
    form.append("password", password);
    
    const res = await fetch("/api/auth/login", { method: "POST", body: form });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    localStorage.setItem("token", data.access_token);
    set({ token: data.access_token });
  },

  register: async (formData) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error("Registration failed");
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
