import React from 'react';
import ProfileImage from './ProfileImage';
import { useChatStore, useUserStore } from '../../config/store';
import { formatDate, formatTime, formatYear, isNewDay, isSameMinute } from '../../utils/dateUtils';
import { ChatMessage } from '../../config/types';

const ChatRenderMessages = ({ chatMessages }: { chatMessages: ChatMessage[] }) => {
  const userNickname = useUserStore((state) => state.user.nickname);
  const otherUserProfileImage = useChatStore((state) => state.otherUserProfileImage);

  let lastMessageDate: string | null = null;

  return chatMessages.map((message: ChatMessage, index: number) => {
    const messageDate = formatDate(message.timestamp);
    const messageTime = formatTime(message.timestamp);
    const isDateDifferent = isNewDay(messageDate, lastMessageDate);
    const nextMessage = chatMessages[index + 1];
    const isLastMessageInTime =
      !nextMessage ||
      nextMessage.sender_nickname !== message.sender_nickname ||
      !isSameMinute(messageTime, formatTime(nextMessage.timestamp));

    lastMessageDate = messageDate;

    return (
      <React.Fragment key={message.id}>
        {isDateDifferent && (
          <div className='mb-5 mt-2 flex items-center justify-center'>
            <span className='rounded-xl bg-slate-200 px-3 py-1 text-xs text-gray-400'>
              {formatYear(message.timestamp)}
            </span>
          </div>
        )}
        <li className={`flex ${message.sender_nickname === userNickname ? 'justify-end' : 'justify-start'} mb-3`}>
          {message.sender_nickname === userNickname ? (
            <div className='mr-3 flex'>
              {isLastMessageInTime && <span className='self-end px-2 py-1 text-xs text-gray-400'>{messageTime}</span>}
              <p className='max-w-[280px] rounded-chat-me bg-softYellow px-4 py-3 text-justify leading-snug'>
                {message.message}
              </p>
            </div>
          ) : (
            <div className='flex'>
              <div className='mx-3 min-h-[49px] min-w-[49px]'>
                <ProfileImage className='max-h-[49px] max-w-[49px] rounded-full' src={otherUserProfileImage} />
              </div>
              <p className='max-w-[240px] rounded-chat-other bg-white px-4 py-3 text-justify leading-snug'>
                {message.message}
              </p>
              {isLastMessageInTime && <span className='self-end px-2 py-1 text-xs text-gray-400'>{messageTime}</span>}
            </div>
          )}
        </li>
      </React.Fragment>
    );
  });
};

export default ChatRenderMessages;
