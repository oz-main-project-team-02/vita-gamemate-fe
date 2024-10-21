import { mock } from './mock';
import { ChatList, Message, Participant } from '../config/types';

// 채팅 목록 조회
export const fetchChatLists = async (): Promise<ChatList[]> => {
  const response = await mock.get('/api/v1/chats/rooms/');
  console.log(response);
  return response.data.sort(
    (a: ChatList, b: ChatList) => new Date(b.last_message_time).getTime() - new Date(a.last_message_time).getTime()
  );
};

// 채팅방 메세지 상세 조회
export const fetchChatMessages = async (
  roomId: number
): Promise<{ participants: Participant[]; messages: Message[] }> => {
  const response = await mock.get(`/api/v1/chats/${roomId}/messages`);
  return {
    participants: response.data.participants,
    messages: response.data.messages.sort(
      (a: Message, b: Message) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    ),
  };
};

// 채팅 전송
export const sendMessage = async ({
  roomId,
  message,
}: {
  roomId: number;
  message: string;
}): Promise<{ message: string }> => {
  const response = await mock.post(`/api/v1/chats/${roomId}/messages`, { message });
  return response.data;
};

// 채팅방 생성
export const createChat = async (mateNickname: string) => {
  const response = await mock.post('/api/v1/chats/create/', { other_user_nickname: mateNickname });
  console.log('mateNickname: ', mateNickname, ', response: ', response);
  return response;
};
