import { ChatList, ChatMessage } from '../config/types';
import { client } from '@/api/client';

/**
 * POST /api/v1/chats/create/
 * @param mateNickname 메이트 닉네임
 * @returns 새로 생성된 또는 이미 존재하는 채팅방 id, 채팅참여자 정보, 채팅 메세지 정보
 */
export const createChat = async (mateNickname: string) => {
  const response = await client.post('/api/v1/chats/create/', { other_user_nickname: mateNickname });
  console.log('mateNickname: ', mateNickname, ', response: ', response);
  return response;
};

/**
 * GET /api/v1/chats/rooms/
 * @returns 사용자 채팅 목록
 */
export const fetchChatLists = async (): Promise<ChatList[]> => {
  const response = await client.get('/api/v1/chats/rooms/');
  console.log(response);
  return response.data.sort(
    (a: ChatList, b: ChatList) => new Date(b.latest_message_time).getTime() - new Date(a.latest_message_time).getTime()
  );
};

/**
 * GET /api/v1/chats/<int:room_id>/messages
 * @returns 채팅 내역 상세 조회
 */
export const fetchChatMessages = async (roomId: number, page: number): Promise<ChatMessage[]> => {
  const response = await client.get(`/api/v1/chats/${roomId}/messages?page=${page}`);
  console.log(response);
  return response.data.results.sort(
    (a: ChatMessage, b: ChatMessage) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
};
