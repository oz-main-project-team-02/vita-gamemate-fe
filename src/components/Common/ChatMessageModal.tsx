import { useEffect, useRef } from 'react';
import { Message, Participant } from '../../config/types';
import { useChatStore, useUserStore } from '../../config/store';
import ChatSubmitForm from './ChatSubmitForm';
import ProfileImage from './ProfileImage';
import { formatTime } from '../../utils/dateUtils';

const ChatMessageModal = () => {
  const userId = useUserStore((state) => state.user.id);
  const { selectedRoomId, chatParticipants, chatMessages, fetchChatMessages } = useChatStore();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const setChatMessageScroll = async () => {
      await fetchChatMessages();
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    setChatMessageScroll();
  }, [selectedRoomId, fetchChatMessages]);

  return (
    <div className='flex h-full flex-col shadow-sm'>
      {chatParticipants.map(
        (participant: Participant) =>
          participant.user_id !== userId && (
            <div className='flex items-center gap-4 px-4 py-3' key={participant.user_id}>
              <ProfileImage className='max-h-[49px] max-w-[49px] rounded-full' src={participant.profile_image} />
              <span className='max-w-[323px] grow truncate text-lg font-semibold'>{participant.nickname}</span>
            </div>
          )
      )}
      <div className='flex h-full max-w-[420px] flex-col overflow-y-auto' ref={scrollRef}>
        {chatMessages.map((message: Message) => (
          <div
            key={message.message_id}
            className={`flex ${message.user_id === userId ? 'justify-end' : 'justify-start'} mb-3`}
          >
            {message.user_id === userId ? (
              <div className='mr-3 flex'>
                <span className='self-end px-2 py-1 text-xs text-gray-400'>{formatTime(message.created_at)}</span>
                <p className='rounded-chat-me max-w-[280px] bg-softYellow px-4 py-3 text-justify leading-snug'>
                  {message.message}
                </p>
              </div>
            ) : (
              <div className='flex'>
                <div className='mx-3 min-h-[49px] min-w-[49px]'>
                  <ProfileImage className='max-h-[49px] max-w-[49px] rounded-full' src={message.profile_image} />
                </div>
                <p className='rounded-chat-other max-w-[240px] bg-white px-4 py-3 text-justify leading-snug'>
                  {message.message}
                </p>
                <span className='self-end px-2 py-1 text-xs text-gray-400'>{formatTime(message.created_at)}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <ChatSubmitForm />
    </div>
  );
};

export default ChatMessageModal;
