import { useChatStore, webSocketStore } from '@/config/store';
import { useEffect } from 'react';

function useChatRoomWebSocket(): WebSocket | null {
  const selectedRoomId = useChatStore((state) => state.selectedRoomId);
  const { chatRoomWebSocket, setChatRoomWebSocket } = webSocketStore();

  useEffect(() => {
    if (selectedRoomId) {
      if (chatRoomWebSocket) {
        chatRoomWebSocket.close();
      }
    }

    console.log('WebSocket 연결 시도중...');

    const ws = new WebSocket(`wss://resdineconsulting.com/ws/chat/${selectedRoomId}/`);

    ws.onopen = () => {
      console.log('채팅방 상세 내역 WebSocket 연결 성공, 채팅방 id: ', selectedRoomId);
      setChatRoomWebSocket(ws);
    };

    ws.onerror = (error) => {
      console.error('채팅방 상세 내역 WebSocket 오류:', error);
    };

    // WebSocket 연결 해제 시
    ws.onclose = (event) => {
      console.log('채팅방 상세 내역 WebSocket 연결 해제. 코드:', event.code, '이유:', event.reason);
      if (!event.wasClean) {
        console.error('채팅방 상세 내역 WebSocket 연결이 비정상적으로 종료되었습니다.');
      }
    };

    return () => {
      ws.close();
      setChatRoomWebSocket(null);
    };
  }, [selectedRoomId, setChatRoomWebSocket]);

  return chatRoomWebSocket;
}

export default useChatRoomWebSocket;
