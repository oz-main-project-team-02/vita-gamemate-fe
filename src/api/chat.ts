import { ChatList, Message, Participant } from '../config/types';
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
    (a: ChatList, b: ChatList) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );
};

// 채팅 전송
export const sendMessage = (socket: WebSocket, { roomId, message }: { roomId: number; message: string }) => {
  if (socket.readyState === WebSocket.OPEN) {
    const data = JSON.stringify({ event: 'send_message', roomId, message });
    socket.send(data);
  } else {
    console.error('WebSocket이 연결되지 않았습니다.');
  }
};

// 채팅방 내역 불러오기
export const fetchChatMessages = (
  socket: WebSocket,
  roomId: number,
  callback: (data: { participants: Participant[]; messages: Message[] }) => void
) => {
  // WebSocket이 연결된 상태인지 확인
  if (socket.readyState === WebSocket.OPEN) {
    const joinRoomData = JSON.stringify({ event: 'join_room', roomId });
    socket.send(joinRoomData);
  } else {
    // WebSocket이 연결되지 않았다면 onopen 이벤트에서 전송하도록 처리
    socket.onopen = () => {
      const joinRoomData = JSON.stringify({ event: 'join_room', roomId });
      socket.send(joinRoomData);
    };
  }

  // 서버에서 메시지를 받으면 callback 실행
  const messageHandler = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    if (data.event === 'chat_history') {
      callback(data);
    }
  };

  // 중복 등록 방지를 위해 기존 이벤트 핸들러 제거 후 등록
  socket.removeEventListener('message', messageHandler);
  socket.addEventListener('message', messageHandler);
};
