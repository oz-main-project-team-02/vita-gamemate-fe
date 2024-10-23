import { useEffect, useRef, useState } from 'react';
import { socketStore, useChatStore } from '../../config/store';
import { sendMessage } from '../../api/chat';

const ChatSubmitForm = () => {
  const socket = socketStore((state) => state.socket);
  const [messageValue, setMessageValue] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const selectedRoomId = useChatStore((state) => state.selectedRoomId);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const submitHandler = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    if (messageValue.trim() !== '' && selectedRoomId && !isSubmitting) {
      if (socket) {
        setIsSubmitting(true);
        sendMessage(socket, { roomId: selectedRoomId, message: messageValue });
        setMessageValue('');
        setIsSubmitting(false);
      } else {
        console.error('소켓이 연결되지 않았습니다. 메시지를 전송할 수 없습니다.');
      }
    }
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
