import { create } from "zustand";
import { persist } from "zustand/middleware";

type Session = {
  token?: string;
  organizationId?: string;
  user?: { id: string; name: string; email: string };
  dark: boolean;
  setSession: (session: { accessToken: string; user: { id: string; name: string; email: string }; organizations: Array<{ id: string }> }) => void;
  logout: () => void;
  toggleTheme: () => void;
};

export const useSessionStore = create<Session>()(
  persist(
    (set) => ({
      dark: true,
      setSession: (session) => set({ token: session.accessToken, user: session.user, organizationId: session.organizations[0]?.id }),
      logout: () => set({ token: undefined, user: undefined, organizationId: undefined }),
      toggleTheme: () => set((state) => ({ dark: !state.dark }))
    }),
    { name: "taskflow-session" }
  )
);
