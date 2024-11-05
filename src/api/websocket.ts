/**
 * @returns 채팅 메세지 전송
 */
export const sendMessage = (
  socket: WebSocket,
  {
    roomId,
    message,
    sender_nickname,
  }: {
    roomId: number;
    message: string;
    sender_nickname: string;
  }
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (socket.readyState === WebSocket.OPEN) {
      const data = JSON.stringify({
        event: 'send_message',
        roomId,
        message,
        sender_nickname,
      });
      socket.send(data);
      resolve();
    } else {
      console.error('WebSocket이 연결되지 않았습니다.');
      reject('WebSocket이 연결되지 않았습니다.');
    }
  });
};
