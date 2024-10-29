import { useEffect } from 'react';

export const useWebSocketListener = <T>(socket: WebSocket | null, onMessage: (data: T) => void) => {
  useEffect(() => {
    if (!socket) return;

    const messageHandler = (event: MessageEvent) => {
      const data = JSON.parse(event.data) as T;
      console.log('수신된 WebSocket 데이터:', data);
      onMessage(data);
    };

    socket.addEventListener('message', messageHandler);

    return () => {
      socket.removeEventListener('message', messageHandler);
    };
  }, [socket, onMessage]);
};
