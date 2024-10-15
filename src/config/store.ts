import { create } from "zustand";

interface ModalStore {
  status: {
    [key: string]: boolean;
  };
  setStatus: (key: string, bool: boolean) => void;
  reset: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  status: {
    login: false,
    category: false,
    chat: false,
    payment: false,
  },
  setStatus: (key: string, bool: boolean) =>
    set((state) => ({ status: { ...state.status, [key]: bool } })),
  reset: () =>
    set(() => ({
      status: { login: false, category: false, chat: false, payment: false },
    })),
}));
