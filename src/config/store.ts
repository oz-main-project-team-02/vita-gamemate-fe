import { create } from "zustand";

interface ModalStore {
  status: {
    [key: string]: boolean;
  };
  setStatus: (key: string, bool: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  status: {
    login: false,
    chat: false,
    payment: false,
  },
  setStatus: (key: string, bool: boolean) =>
    set((state) => ({ status: { ...state.status, [key]: bool } })),
}));
