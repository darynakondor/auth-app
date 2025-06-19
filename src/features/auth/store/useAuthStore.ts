import { create } from "zustand";

interface AuthStore {
  user: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (email, _password) => {
    set({ user: email });
  },
  logout: () => set({ user: null }),
}));
