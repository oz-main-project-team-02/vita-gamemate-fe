import { mock } from './mock';
import { ChatList, Message, Participant } from '../config/types';

/**
 * POST /api/v1/chats/create/
 * @param mateNickname 메이트 닉네임
 * @returns 새로 생성된 또는 이미 존재하는 채팅방 id, 채팅참여자 정보, 채팅 메세지 정보
 */
export const createChat = async (mateNickname: string) => {
  const response = await mock.post('/api/v1/chats/create/', { other_user_nickname: mateNickname });
  console.log('mateNickname: ', mateNickname, ', response: ', response);
  return response;
};

/**
 * GET /api/v1/chats/rooms/
 * @returns 사용자 채팅 목록
 */
export const fetchChatLists = async (): Promise<ChatList[]> => {
  const response = await mock.get('/api/v1/chats/rooms/');
  console.log(response);
  return response.data.sort(
    (a: ChatList, b: ChatList) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );
};

// 채팅 전송 (웹소켓으로 변경 예정)
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

// 채팅방 메세지 상세 조회 (웹소켓으로 변경 예정)
export const fetchChatMessages = async (
  roomId: number
): Promise<{ participants: Participant[]; messages: Message[] | null }> => {
  const response = await mock.get(`/api/v1/chats/${roomId}/messages`);
  return {
    participants: response.data.participants,
    messages: response.data.messages?.sort(
      (a: Message, b: Message) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    ),
  };
};
