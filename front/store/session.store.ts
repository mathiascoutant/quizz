import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SessionState = {
  session: Session | null;
  sessionLogOut: () => void;
  sessionLogIn: (session: Session) => void;
  updateUser: (user: User) => void;
};

export type Session = {
  token: string;
  user: User;
};

export type User = {
  id: string;
  email: string;
  pseudo: string;
  firstname: string;
  lastname: string;
  password: string;
  coins: number;
  badges: Badge[];
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  urlImage: string;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      session: null,
      sessionLogOut: () => set({ session: null }),
      sessionLogIn: (session) => set({ session }),
      updateUser: (updatedUser) =>
        set({
          session: {
            ...get().session,
            user: updatedUser,
          } as Session,
        }),
    }),
    {
      name: 'session-storage',
    }
  )
);
