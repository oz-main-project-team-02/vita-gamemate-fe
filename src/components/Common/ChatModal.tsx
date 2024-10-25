import { useChatModalStore, useChatStore } from '../../config/store';
import { IoMdClose } from 'react-icons/io';
import ChatMessageModal from './ChatMessageModal';
import { useEffect, useRef } from 'react';
import { formatDate, formatTime, isToday } from '../../utils/dateUtils';
import ProfileImage from './ProfileImage';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useQuery } from '@tanstack/react-query';
import { fetchChatLists } from '../../api/chat';
import { ChatList } from '../../config/types';

const ChatModal = () => {
  const { isChatModalOpen, setChatModalClose } = useChatModalStore();
  const { selectedRoomId, setSelectedRoomId, setOtherUserId, setOtherUserNickname, setOtherUserProfileImage } =
    useChatStore();
  const chatModalRef = useRef<HTMLDivElement | null>(null);
  const chatMessageModalRef = useRef<HTMLDivElement | null>(null);

  const {
    data: chatList,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<ChatList[]>({
    queryKey: ['chatList'],
    queryFn: fetchChatLists,
  });

  useEffect(() => {
    if (isSuccess && chatList && chatList.length > 0) {
      setSelectedRoomId(chatList[0].id);
      setOtherUserId(chatList[0].other_user_id);
      setOtherUserNickname(chatList[0].other_user_nickname);
      if (chatList[0].other_user_profile_image) {
        setOtherUserProfileImage(chatList[0].other_user_profile_image);
      } else setOtherUserProfileImage('/favicon.png');
    }
  }, [isSuccess, chatList, setSelectedRoomId]);

  useEffect(() => {
    if (isChatModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isChatModalOpen]);

  const chatParticipantHandler = (chatItem: ChatList) => {
    setSelectedRoomId(chatItem.id);
    setOtherUserId(chatItem.other_user_id);
    setOtherUserNickname(chatItem.other_user_nickname);
    if (chatItem.other_user_profile_image) {
      setOtherUserProfileImage(chatItem.other_user_profile_image);
    } else setOtherUserProfileImage('/favicon.png');
  };

  useOnClickOutside([chatModalRef, chatMessageModalRef], setChatModalClose);

  if (!isChatModalOpen) return null;
  if (isError) {
    console.error('채팅 목록 조회 실패: ', isError);
    return alert('채팅창을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }

  const chatModalPosition = chatList && chatList.length > 0 ? 'right-[420px]' : 'right-0';

  return (
    <div className='fixed inset-0 z-50 bg-black/50'>
      <div className={`fixed ${chatModalPosition} top-0 h-full min-w-[360px] bg-white shadow-sm`} ref={chatModalRef}>
        <div className='flex h-full flex-col'>
          <div className='flex items-center gap-3 px-4 py-2'>
            <span className='cursor-pointer'>
              <IoMdClose onClick={setChatModalClose} size={20} />
            </span>
            <span className='text-2xl font-semibold'>채팅</span>
          </div>
          <div className='flex h-full max-w-[360px] flex-col overflow-y-auto'>
            {isLoading && <div className='my-10 text-center text-gray-400'>채팅창을 불러오는 중입니다...</div>}
            {chatList && chatList.length > 0
              ? chatList.map((chatItem) => (
                  <div
                    className={`flex gap-3 px-3 py-4 ${chatItem.id === selectedRoomId ? 'bg-skyGray' : 'hover:bg-lightSkyGray'}`}
                    key={chatItem.id}
                    onClick={() => chatParticipantHandler(chatItem)}
                  >
                    <div className='flex min-h-[49px] min-w-[49px] items-center justify-center rounded-full bg-gray-100'>
                      <ProfileImage
                        className='max-h-[49px] max-w-[49px] rounded-full'
                        src={chatItem.other_user_profile_image}
                      />
                    </div>
                    <div className='flex grow flex-col gap-1'>
                      <div className='flex items-center justify-between'>
                        <span className='max-w-[240px] grow truncate font-semibold'>
                          {chatItem.other_user_nickname}
                        </span>
                        <span className='text-xs text-gray-400'>
                          {isToday(new Date(chatItem.updated_at))
                            ? formatTime(chatItem.updated_at)
                            : formatDate(chatItem.updated_at)}
                        </span>
                      </div>
                      {
                        <p className='max-w-[240px] truncate text-sm'>
                          {chatItem.latest_message ? chatItem.latest_message : ''}
                        </p>
                      }
                    </div>
                  </div>
                ))
              : !isLoading && (
                  <div className='flex h-[300px] w-full flex-col items-center justify-center gap-8'>
                    <img className='max-h-[160px] max-w-[160px] rounded-full' src='/favicon.png' />
                    <p>비타에서 게임 메이트와 즐겁게 대화하며 즐겨보세요!</p>
                  </div>
                )}
          </div>
        </div>
      </div>
      {chatList && chatList.length > 0 && (
        <div className='fixed right-0 top-0 h-full min-w-[420px] bg-skyGray' ref={chatMessageModalRef}>
          <ChatMessageModal />
        </div>
      )}
    </div>
  );
};

export default ChatModal;
