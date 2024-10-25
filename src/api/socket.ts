import { socketStore, useChatStore } from '@/config/store';
import { useEffect } from 'react';

function useSocket(): WebSocket | null {
  const selectedRoomId = useChatStore((state) => state.selectedRoomId);
  const { socket, setSocket } = socketStore();

  useEffect(() => {
    if (selectedRoomId && !socket) {
      console.log('WebSocket 연결 시도중...');

      const ws = new WebSocket(`wss://resdineconsulting.com/ws/chat/${selectedRoomId}/`);

      ws.onopen = () => {
        console.log('WebSocket 연결 성공, 채팅방 id: ', selectedRoomId);
      };

      ws.onerror = (error) => {
        console.error('WebSocket 오류:', error);
      };

      // WebSocket 연결 해제 시
      ws.onclose = (event) => {
        console.log('WebSocket 연결 해제. 코드:', event.code, '이유:', event.reason);
        if (event.wasClean) {
          console.log('WebSocket 연결 해제');
        } else {
          console.error('WebSocket 연결이 비정상적으로 종료되었습니다.');
        }
      };
      setSocket(ws);

      return () => {
        ws.close();
        setSocket(null);
      };
    }
  }, [selectedRoomId, socket, setSocket]);

  return socket;
}

export default useSocket;
