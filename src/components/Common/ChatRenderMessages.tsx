import React from 'react';
import ProfileImage from './ProfileImage';
import { useUserStore } from '../../config/store';
import { formatDate, formatTime, formatYear, isNewDay, isSameMinute } from '../../utils/dateUtils';
import { Message } from '../../config/types';

const ChatRenderMessages = ({ chatMessages }: { chatMessages: Message[] }) => {
  const userId = useUserStore((state) => state.user.id);

  let lastMessageDate: string | null = null;

  return chatMessages.map((message: Message, index: number) => {
    const messageDate = formatDate(message.created_at);
    const messageTime = formatTime(message.created_at);
    const isDateDifferent = isNewDay(messageDate, lastMessageDate);
    const nextMessage = chatMessages[index + 1];
    const isLastMessageInTime =
      !nextMessage ||
      nextMessage.user_id !== message.user_id ||
      !isSameMinute(messageTime, formatTime(nextMessage.created_at));

    lastMessageDate = messageDate;

    return (
      <React.Fragment key={message.message_id}>
        {isDateDifferent && (
          <div className='mb-5 mt-2 flex items-center justify-center'>
            <span className='rounded-xl bg-slate-200 px-3 py-1 text-xs text-gray-400'>
              {formatYear(message.created_at)}
            </span>
          </div>
        )}
        <div className={`flex ${message.user_id === userId ? 'justify-end' : 'justify-start'} mb-3`}>
          {message.user_id === userId ? (
            <div className='mr-3 flex'>
              {isLastMessageInTime && <span className='self-end px-2 py-1 text-xs text-gray-400'>{messageTime}</span>}
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
              {isLastMessageInTime && <span className='self-end px-2 py-1 text-xs text-gray-400'>{messageTime}</span>}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  });
};

export default ChatRenderMessages;
