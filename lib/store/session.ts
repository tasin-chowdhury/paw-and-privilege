import { create } from "zustand";

interface SessionState {
  currentProviderId: string;
  setCurrentProviderId: (id: string) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  currentProviderId: "p-01",
  setCurrentProviderId: (id) => set({ currentProviderId: id }),
}));
