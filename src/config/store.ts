import { create } from 'zustand';
import { ChatList, Message, Participant, User } from './types';
import axios from 'axios';

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
    nickname: '',
    email: '',
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
        nickname: '',
        email: '',
        gender: null,
        description: '',
        birthday: null,
        profile_image: null,
        is_mate: false,
        is_onlien: false,
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
  chatList: ChatList[];
  chatParticipants: Participant[];
  chatMessages: Message[];
  selectedRoomId: number | null;
  setSelectedRoomId: (roomId: number) => void;
  fetchChatLists: () => Promise<void>;
  fetchChatMessages: () => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chatList: [],
  chatParticipants: [],
  chatMessages: [],
  selectedRoomId: null,
  setSelectedRoomId: (id: number) => set({ selectedRoomId: id }),
  fetchChatLists: async () => {
    try {
      const response = await axios.get('/api/v1/chats/rooms/');

      if (response.data.length > 0) {
        // 최신순 정렬
        const sortedChatList = response.data.sort(
          (a: ChatList, b: ChatList) =>
            new Date(b.last_message_time).getTime() - new Date(a.last_message_time).getTime()
        );
        set({ chatList: sortedChatList });

        // 가장 최근 채팅방 선택
        if (sortedChatList.length > 0) {
          set({ selectedRoomId: sortedChatList[0].chat_room_id });
        }
      }
    } catch (error) {
      // 에러 처리 해야됨
      console.error(error);
    }
  },
  fetchChatMessages: async () => {
    try {
      const selectedRoomId = get().selectedRoomId;

      if (selectedRoomId) {
        const response = await axios.get(`/api/v1/chats/${selectedRoomId}/messages`);
        set({ chatParticipants: response.data.participants });

        // 메세지 정렬
        const sortedMessages = response.data.messages.sort(
          (a: Message, b: Message) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        set({ chatMessages: sortedMessages });
      }
    } catch (error) {
      // 에러 처리 해야됨
      console.error(error);
    }
  },
}));
