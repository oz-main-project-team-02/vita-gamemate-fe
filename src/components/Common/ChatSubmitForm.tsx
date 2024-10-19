import axios from 'axios';
import { useState } from 'react';
import { useChatStore } from '../../config/store';

const ChatSubmitForm = () => {
  const [messageValue, setMessageValue] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const selectedRoomId = useChatStore((state) => state.selectedRoomId);

  const submitHandler = async () => {
    if (messageValue.trim() !== '' && !isSubmitting) {
      setIsSubmitting(true);
      console.log('채팅 메세지:', messageValue);

      try {
        const response = await axios.post(`/api/v1/chats/${selectedRoomId}/messages`, {
          message: messageValue,
        });
        console.log(response);
        setMessageValue('');
      } catch (error) {
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const enterKeyHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitHandler();
    }
  };

  return (
    <form
      className='flex min-h-[130px] w-[420px] items-center gap-2 bg-white px-4 py-3'
      onSubmit={(e) => e.preventDefault()}
    >
      <textarea
        className='h-full grow resize-none bg-white outline-none'
        value={messageValue}
        onChange={(e) => setMessageValue(e.target.value)}
        onKeyDown={enterKeyHandler}
      ></textarea>
      <button
        className='flex h-full w-[80px] items-center justify-center rounded-xl bg-deepYellow p-4 text-sm'
        type='button'
        onClick={submitHandler}
      >
        전송
      </button>
    </form>
  );
};

export default ChatSubmitForm;
