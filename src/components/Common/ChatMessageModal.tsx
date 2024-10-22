import { useEffect, useRef } from 'react';
import { Participant } from '../../config/types';
import { useChatStore, useUserStore } from '../../config/store';
import ChatSubmitForm from './ChatSubmitForm';
import ProfileImage from './ProfileImage';
import ChatRenderMessages from './ChatRenderMessages';
import { useQuery } from '@tanstack/react-query';
import { fetchChatMessages } from '../../api/chat';

const ChatMessageModal = () => {
  const userId = useUserStore((state) => state.user.id);
  const { selectedRoomId } = useChatStore();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const {
    data: chatData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['chatMessages', selectedRoomId],
    queryFn: () => fetchChatMessages(selectedRoomId!), // selectedRoomId가 null이 아닐 때 실행
    enabled: !!selectedRoomId, // selectedRoomId가 존재할 때만 쿼리 실행
  });

  useEffect(() => {
    if (chatData && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatData]);

  if (isLoading) return <div className='my-10 text-center text-gray-400'>채팅방 내역을 불러오는 중입니다...</div>;
  if (error) {
    console.error('채팅창 내역 상세 조회 실패: ', error);
    return (
      <div className='my-10 flex w-full flex-col items-center justify-center text-gray-400'>
        <p>채팅방 내역을 불러오는 중 오류가 발생했습니다.</p>
        <p>새로고침 후 다시 시도해주세요.</p>
      </div>
    );
  }

  return (
    <div className='flex h-full flex-col shadow-sm'>
      {chatData &&
        chatData.participants.map(
          (participant: Participant) =>
            participant.user_id !== userId && (
              <div className='flex items-center gap-4 px-4 py-3' key={participant.user_id}>
                <ProfileImage className='max-h-[49px] max-w-[49px] rounded-full' src={participant.profile_image} />
                <span className='max-w-[323px] grow truncate text-lg font-semibold'>{participant.nickname}</span>
              </div>
            )
        )}
      <div className='flex h-full max-w-[420px] flex-col overflow-y-auto' ref={scrollRef}>
        {chatData?.messages && chatData?.messages.length > 0 && <ChatRenderMessages chatMessages={chatData.messages} />}
      </div>
      <ChatSubmitForm />
    </div>
  );
};

export default ChatMessageModal;
