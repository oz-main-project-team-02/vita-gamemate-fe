import { useCallback, useEffect, useRef } from 'react';
import { useChatModalStore, useChatStore } from '../../config/store';
import { IoMdClose } from 'react-icons/io';
import { formatDate, formatTime, isToday } from '../../utils/dateUtils';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchChatLists } from '../../api/chat';
import { ChatList } from '../../config/types';
import useChatListWebSocket from '@/hooks/useChatListWebSocket';
import ChatMessageModal from './ChatMessageModal';
import ProfileImage from './ProfileImage';
import { useWebSocketListener } from '@/hooks/useWebSocketListener';

const ChatModal = () => {
  const queryClient = useQueryClient();
  const { isChatModalOpen, setChatModalClose } = useChatModalStore();
  const { selectedRoomId, setSelectedRoomId, setOtherUserId, setOtherUserNickname, setOtherUserProfileImage } =
    useChatStore();
  const chatModalRef = useRef<HTMLDivElement | null>(null);
  const chatMessageModalRef = useRef<HTMLDivElement | null>(null);

  // 채팅 목록 업데이트 시 동작 정의
  const handleNewChatListMessage = useCallback(
    (newChatData: ChatList) => {
      queryClient.setQueryData(['chatList'], (oldChatList: ChatList[] | undefined) => {
        if (!oldChatList) return [newChatData];

        // 기존 채팅방 찾기
        const existingChatIndex = oldChatList.findIndex((chat) => chat.id === newChatData.id);

        if (existingChatIndex > -1) {
          // 기존 채팅방 업데이트
          const updatedChat = { ...oldChatList[existingChatIndex], ...newChatData };
          const newList = [...oldChatList];
          newList.splice(existingChatIndex, 1); // 기존 위치에서 제거
          return [updatedChat, ...newList]; // 업데이트된 채팅방을 맨 앞으로
        } else {
          // 새로운 채팅방 추가
          return [newChatData, ...oldChatList];
        }
      });
    },
    [queryClient]
  );

  // 채팅 목록 WebSocket 연결
  const chatListSocket = useChatListWebSocket(handleNewChatListMessage);

  // WebSocket 메세지 수신 핸들러 등록
  useWebSocketListener<ChatList>(chatListSocket, handleNewChatListMessage);

  // 초기 채팅 목록 불러오기
  const {
    data: chatList,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<ChatList[]>({
    queryKey: ['chatList'],
    queryFn: fetchChatLists,
    enabled: isChatModalOpen,
  });

  // 채팅 상대방 정보 관리
  const setOtherUserInfo = (chatInfo: ChatList) => {
    setSelectedRoomId(chatInfo.id);
    setOtherUserId(chatInfo.other_user_id);
    setOtherUserNickname(chatInfo.other_user_nickname);
    setOtherUserProfileImage(chatInfo.other_user_profile_image || '/favicon.png');
  };

  // 가장 최신 채팅방의 정보를 보여주기
  useEffect(() => {
    if (isSuccess && chatList && chatList.length > 0) {
      setOtherUserInfo(chatList[0]);
    }
  }, [isSuccess, chatList]);

  // 채팅 모달 open시 root 스크롤 없애기
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

  const chatOtherUserInfoHandler = (chatItem: ChatList) => {
    setOtherUserInfo(chatItem);
  };

  useOnClickOutside([chatModalRef, chatMessageModalRef], setChatModalClose);

  if (!isChatModalOpen) return null;
  if (isError) {
    console.error('채팅 목록 조회 실패: ', isError);
    alert('채팅창을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    setChatModalClose();
    return null;
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
                    onClick={() => chatOtherUserInfoHandler(chatItem)}
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
                          {isToday(new Date(chatItem.latest_message_time))
                            ? formatTime(chatItem.latest_message_time)
                            : formatDate(chatItem.latest_message_time)}
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
