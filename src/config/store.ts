import { create } from 'zustand';
import { User } from './types';
import { AxiosError } from 'axios';

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
  otherUserId: number | null;
  otherUserNickname: string | null;
  otherUserProfileImage: string | null;
  setSelectedRoomId: (roomId: number) => void;
  setOtherUserId: (mateId: number) => void;
  setOtherUserNickname: (nickname: string) => void;
  setOtherUserProfileImage: (image: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  selectedRoomId: null,
  otherUserId: null,
  otherUserNickname: null,
  otherUserProfileImage: null,
  setSelectedRoomId: (id: number) => set({ selectedRoomId: id }),
  setOtherUserId: (id: number) => set({ otherUserId: id }),
  setOtherUserNickname: (nickname: string) => set({ otherUserNickname: nickname }),
  setOtherUserProfileImage: (image: string) => set({ otherUserProfileImage: image }),
}));

interface OrderModalState {
  isOrderModalOpen: boolean;
  setOrderModalOpen: () => void;
  setOrderModalClose: () => void;
}

export const useOrderModalStore = create<OrderModalState>((set) => ({
  isOrderModalOpen: false,
  setOrderModalOpen: () => set({ isOrderModalOpen: true }),
  setOrderModalClose: () => set({ isOrderModalOpen: false }),
}));

interface WebSocketState {
  chatRoomWebSocket: WebSocket | null;
  chatListWebSocket: WebSocket | null;
  setChatRoomWebSocket: (socket: WebSocket | null) => void;
  setChatListWebSocket: (socket: WebSocket | null) => void;
}

export const webSocketStore = create<WebSocketState>((set) => ({
  chatRoomWebSocket: null,
  chatListWebSocket: null,
  setChatRoomWebSocket: (chatRoomWebSocket: WebSocket | null) => set({ chatRoomWebSocket }),
  setChatListWebSocket: (chatListWebSocket: WebSocket | null) => set({ chatListWebSocket }),
}));

type ErrorType = Error | AxiosError | null;

interface ErrorStore {
  error: ErrorType;
  updateError: (error: ErrorType) => void;
}

export const useErrorStore = create<ErrorStore>((set) => ({
  error: null,
  updateError: (error) => set({ error }),
}));
