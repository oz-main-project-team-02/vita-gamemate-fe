import { useEffect, useRef, useState } from 'react';
import { useChatStore } from '../../config/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendMessage } from '../../api/chat';

const ChatSubmitForm = () => {
  const [messageValue, setMessageValue] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const selectedRoomId = useChatStore((state) => state.selectedRoomId);
  const queryClient = useQueryClient(); // QueryClient 인스턴스 가져오기 (캐시 무효화를 위함)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const mutation = useMutation<{ message: string }, Error, { roomId: number; message: string }>({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      console.log('메세지 전송 성공: ', data.message);
      setMessageValue('');
      setIsSubmitting(false);

      // selectedRoomId가 null이 아닌 경우에만 invalidateQueries 호출 (채팅 메시지 캐시 무효화)
      if (selectedRoomId) {
        queryClient.invalidateQueries({ queryKey: ['chatMessages', selectedRoomId] });
      }
    },
    onError: (error) => {
      setIsSubmitting(false);
      console.error('메세지 전송 실패: ', error);
      alert('메시지 전송에 실패했습니다. 다시 시도해주세요.');
    },
  });

  useEffect(() => {
    if (!isSubmitting && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isSubmitting]);

  const submitHandler = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    if (messageValue.trim() !== '' && selectedRoomId && !isSubmitting) {
      setIsSubmitting(true);
      mutation.mutate({ roomId: selectedRoomId, message: messageValue }); // Mutation 실행
    }
  };

  const enterKeyHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitHandler();
    }
  };

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
