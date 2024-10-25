import { useEffect, useRef, useState } from 'react';
import { socketStore, useChatStore, useUserStore } from '../../config/store';
import { sendMessage } from '../../api/chat';

const ChatSubmitForm = () => {
  const socket = socketStore((state) => state.socket);
  const user = useUserStore((state) => state.user);
  const selectedRoomId = useChatStore((state) => state.selectedRoomId);
  const otherUserNickname = useChatStore((state) => state.otherUserNickname);
  const [messageValue, setMessageValue] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const submitHandler = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    if (!messageValue.trim() || !selectedRoomId || isSubmitting) return;

    if (!socket) {
      console.error('소켓이 연결되지 않았습니다. 메시지를 전송할 수 없습니다.');
      return;
    }

    if (!user.nickname || !otherUserNickname) {
      console.error('닉네임 정보가 없습니다. 메시지를 전송할 수 없습니다.');
      return;
    }

    setIsSubmitting(true);
    sendMessage(socket, {
      roomId: selectedRoomId,
      message: messageValue,
      sender_nickname: user.nickname,
      main_user_nickname: user.nickname,
      other_user_nickname: otherUserNickname,
    });
    setMessageValue('');
    setIsSubmitting(false);
  };

  const enterKeyHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitHandler();
    }
  };

  useEffect(() => {
    if (!isSubmitting && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <form className='flex min-h-[130px] w-[420px] items-center gap-2 bg-white px-4 py-3' onSubmit={submitHandler}>
      <textarea
        className='h-full grow resize-none bg-white outline-none'
        ref={textareaRef}
        value={messageValue}
        onChange={(e) => setMessageValue(e.target.value)}
        onKeyDown={enterKeyHandler}
        disabled={isSubmitting}
      ></textarea>
      <button
        className='flex h-full w-[80px] items-center justify-center rounded-xl bg-deepYellow p-4 text-sm'
        type='button'
        onClick={submitHandler}
        disabled={isSubmitting}
      >
        전송
      </button>
    </form>
  );
};

export default ChatSubmitForm;
