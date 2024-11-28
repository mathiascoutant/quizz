import { create } from "zustand";
import { persist } from "zustand/middleware";

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
      updateUser: (updatedUser) => {
        // Log avant la mise à jour pour voir l'état initial de la session
        console.log(
          "État initial de la session avant mise à jour:",
          get().session
        );

        // Assurez-vous que l'utilisateur mis à jour est complet et que le token reste inchangé
        set((state) => ({
          session: state.session
            ? {
                ...state.session, // Conserve le token et les autres propriétés de la session
                user: { ...updatedUser }, // Met à jour l'utilisateur sans modifier le token
              }
            : null,
        }));

        // Log après la mise à jour pour vérifier l'état final de la session
        console.log("Nouvelle session après mise à jour:", get().session);
      },
    }),
    {
      name: "session-storage",
    }
  )
);
