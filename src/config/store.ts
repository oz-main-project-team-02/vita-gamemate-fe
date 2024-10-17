import { create } from "zustand";
import { User } from "./types";

interface ModalStore {
  modalStatus: {
    [key: string]: boolean;
  };
  setModalStatus: (key: string, bool: boolean) => void;
  reset: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modalStatus: {
    login: false,
    category: false,
    chat: false,
    payment: false,
  },
  setModalStatus: (key: string, bool: boolean) =>
    set((state) => ({ modalStatus: { ...state.modalStatus, [key]: bool } })),
  reset: () =>
    set(() => ({
      modalStatus: { login: false, category: false, chat: false, payment: false },
    })),
}));

interface UserStore {
  user: User;
  setUser: (user: User) => void;
  reset: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    id: 0,
    nickname: "",
    email: "",
    gender: null,
    description: null,
    birthday: null,
    profile_image: null,
    is_mate: false,
    is_onlien: false,
  },
  setUser: (user: User) => set({ user }),
  reset: () =>
    set({
      user: {
        id: 0,
        nickname: "",
        email: "",
        gender: null,
        description: "",
        birthday: null,
        profile_image: null,
        is_mate: false,
        is_onlien: false,
      },
    }),
}));
