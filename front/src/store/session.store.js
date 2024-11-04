import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSessionStore = create(
  persist(
    (set) => ({
      session: null,
      sessionLogOut: () => set({ session: null }),
      sessionLogIn: (session) => set({ session }),
    }),
    {
      name: 'session-storage',
    }
  )
);
