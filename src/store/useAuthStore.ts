import { create } from "zustand";
import { persist } from "zustand/middleware";
import { USERS } from "@/data/users";
import type { User } from "@/types/auth";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (payload: { username: string; password: string }) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login(payload) {
        const user = USERS.find(
          ({ username, password }) =>
            payload.username === username && payload.password === password,
        );
        if (!user) return false;

        set({
          user: { id: user.id, username: user.username, role: user.role },
          isAuthenticated: true,
        });
        return true;
      },

      logout() {
        set({ user: null, isAuthenticated: false });
      },
    }),
    { name: "auth" },
  ),
);
