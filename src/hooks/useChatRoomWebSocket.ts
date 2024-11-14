import { useChatStore, webSocketStore } from '@/config/store';
import { useEffect } from 'react';

function useChatRoomWebSocket(): WebSocket | null {
  const activeRoomId = useChatStore((state) => state.activeRoomId);
  const { chatRoomWebSocket, setChatRoomWebSocket } = webSocketStore();

  useEffect(() => {
    if (activeRoomId) {
      if (chatRoomWebSocket) {
        chatRoomWebSocket.close();
      }
    }

    const accessToken = localStorage.getItem('accessToken');
    const ws = new WebSocket(`wss://jangsalicense.com/ws/chat/${activeRoomId}/?token=${accessToken}`);

    ws.onopen = () => {
      //console.log('채팅방 상세 내역 WebSocket 연결 성공, 채팅방 id: ', activeRoomId);
      setChatRoomWebSocket(ws);
    };

    ws.onerror = (error) => {
      console.error('채팅방 상세 내역 WebSocket 오류:', error);
    };

    // WebSocket 연결 해제 시
    ws.onclose = (event) => {
      //console.log('채팅방 상세 내역 WebSocket 연결 해제. 코드:', event.code, '이유:', event.reason);
      if (!event.wasClean) {
        console.error('채팅방 상세 내역 WebSocket 연결이 비정상적으로 종료되었습니다.');
      }
    };

    return () => {
      ws.close();
      setChatRoomWebSocket(null);
    };
  }, [activeRoomId, setChatRoomWebSocket]);

  return chatRoomWebSocket;
}

export default useChatRoomWebSocket;
