import { useChatModalStore, webSocketStore } from '@/config/store';
import { ChatList } from '@/config/types';
import { useEffect } from 'react';

function useChatListWebSocket(onNewMessage: (data: ChatList) => void): WebSocket | null {
  const isChatModalOpen = useChatModalStore((state) => state.isChatModalOpen);
  const { chatListWebSocket, setChatListWebSocket } = webSocketStore();

  useEffect(() => {
    if (isChatModalOpen) {
      if (chatListWebSocket) {
        chatListWebSocket.close();
      }
      const ws = new WebSocket('wss://resdineconsulting.com/ws/chat/list/');

      ws.onopen = () => {
        console.log('채팅 리스트 WebSocket 연결 성공');
        setChatListWebSocket(ws);
      };

      ws.onerror = (error) => {
        console.error('채팅 리스트 WebSocket 오류:', error);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('채팅 리스트 업데이트 데이터:', data);
        onNewMessage(data);
      };

      ws.onclose = (event) => {
        console.log('채팅 리스트 WebSocket 연결 해제:', event);
        setChatListWebSocket(null);
      };

      return () => {
        ws.close();
        setChatListWebSocket(null);
      };
    } else if (chatListWebSocket) {
      chatListWebSocket.close();
      setChatListWebSocket(null);
    }
  }, [isChatModalOpen, setChatListWebSocket, onNewMessage]);

  return chatListWebSocket;
}

export default useChatListWebSocket;
