import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  currentUserId: string | null;
  setToken: (token: string, userId: string) => void;
  removeToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem("accessToken"),
  currentUserId: localStorage.getItem("currentUserId") || null,

  setToken: (token, userId) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("currentUserId", userId);
    set({ isAuthenticated: true, currentUserId: userId });
  },

  removeToken: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUserId");
    set({ isAuthenticated: false, currentUserId: null });
  },
}));
