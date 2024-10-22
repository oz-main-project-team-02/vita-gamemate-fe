import { create } from 'zustand';
import { User } from './types';

interface ModalStore {
  modalStatus: {
    [key: string]: boolean;
  };
  setModalStatus: (key: string, bool: boolean) => void;
  unSetModalStatus: () => void;
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
  unSetModalStatus: () =>
    set(() => ({
      modalStatus: { login: false, category: false, chat: false, payment: false },
    })),
}));

interface UserStore {
  user: User;
  setUser: (newUserData: Partial<User>) => void;
  unSetUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    id: 0,
    nickname: null,
    email: null,
    gender: null,
    description: null,
    birthday: null,
    profile_image: null,
    social_provider: null,
    is_mate: false,
    is_online: false,
    average_rating: 0,
    amount: 0,
    coin: 0,
    mate_game_info: [],
  },
  setUser: (newUserData) =>
    set((state) => ({
      user: { ...state.user, ...newUserData },
    })),
  unSetUser: () =>
    set({
      user: {
        id: 0,
        nickname: null,
        email: null,
        gender: null,
        description: null,
        birthday: null,
        profile_image: null,
        social_provider: null,
        is_mate: false,
        is_online: false,
        coin: 0,
        average_rating: 0,
        amount: 0,
        mate_game_info: [],
      },
    }),
}));

interface ChatModalState {
  isChatModalOpen: boolean;
  setChatModalOpen: () => void;
  setChatModalClose: () => void;
}

export const useChatModalStore = create<ChatModalState>((set) => ({
  isChatModalOpen: false,
  setChatModalOpen: () => set({ isChatModalOpen: true }),
  setChatModalClose: () => set({ isChatModalOpen: false }),
}));

interface ChatState {
  selectedRoomId: number | null;
  setSelectedRoomId: (roomId: number) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  selectedRoomId: null,
  setSelectedRoomId: (id: number) => set({ selectedRoomId: id }),
}));
