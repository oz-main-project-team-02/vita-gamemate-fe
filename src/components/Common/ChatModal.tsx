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
  const { activeRoomId, setActiveRoomId, setOtherUserId, setOtherUserNickname, setOtherUserProfileImage } =
    useChatStore();
  const chatModalRef = useRef<HTMLDivElement | null>(null);
  const chatMessageModalRef = useRef<HTMLDivElement | null>(null);

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
    refetchOnMount: true, //컴포넌트가 마운트될 때마다 쿼리가 다시 실행
    refetchOnWindowFocus: false, //사용자가 브라우저 탭이나 창을 다시 포커스할 때 쿼리가 자동으로 다시 실행되지 않음
    staleTime: 0, // 항상 최신 데이터를 가져오도록 설정
  });

  // 채팅 목록 업데이트
  const handleNewChatListMessage = useCallback(
    (newChatData: ChatList) => {
      queryClient.setQueryData(['chatList'], (oldChatList: ChatList[] | undefined) => {
        if (!oldChatList) return [newChatData];

        const updatedList = oldChatList.map((chat) =>
          chat.id === newChatData.id
            ? {
                ...chat,
                latest_message: newChatData.latest_message,
                latest_message_time: newChatData.latest_message_time,
                unread_count: chat.id === activeRoomId ? 0 : newChatData.unread_count,
              }
            : chat
        );

        // 새로운 채팅방인 경우 목록에 추가
        if (!updatedList.some((chat) => chat.id === newChatData.id)) {
          updatedList.unshift(newChatData);
        }

        // 최신 메시지 시간 순으로 정렬
        return updatedList.sort(
          (a, b) => new Date(b.latest_message_time).getTime() - new Date(a.latest_message_time).getTime()
        );
      });
    },
    [queryClient, activeRoomId]
  );

  // 채팅 목록 WebSocket 연결
  const chatListSocket = useChatListWebSocket(handleNewChatListMessage);

  // WebSocket 메세지 수신 핸들러 등록
  useWebSocketListener<ChatList>(chatListSocket, handleNewChatListMessage);

  // 채팅 상대방 정보 관리
  const setOtherUserInfo = (chatInfo: ChatList) => {
    setOtherUserId(chatInfo.other_user_id);
    setOtherUserNickname(chatInfo.other_user_nickname);
    setOtherUserProfileImage(chatInfo.other_user_profile_image || '/favicon.png');
  };

  // 가장 최신 채팅방의 정보를 보여주기
  useEffect(() => {
    if (isSuccess && chatList && chatList.length > 0) {
      const currentActiveRoom = chatList.find((chat) => chat.id === activeRoomId);
      if (currentActiveRoom) {
        setActiveRoomId(currentActiveRoom.id);
        setOtherUserInfo(currentActiveRoom);
      } else {
        setActiveRoomId(chatList[0].id);
        setOtherUserInfo(chatList[0]);
      }
    }
  }, [isSuccess]);

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

  const chatActiveHandler = (chatItem: ChatList) => {
    setActiveRoomId(chatItem.id);
    setOtherUserInfo(chatItem);

    // 선택된 채팅방의 unread_count 리셋
    queryClient.setQueryData(['chatList'], (oldChatList: ChatList[] | undefined) => {
      if (!oldChatList) return oldChatList;

      return oldChatList.map((chat) => (chat.id === chatItem.id ? { ...chat, unread_count: 0 } : chat));
    });
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
      <section
        className={`fixed ${chatModalPosition} top-0 h-full min-w-[360px] bg-white shadow-sm`}
        ref={chatModalRef}
      >
        <div className='flex h-full flex-col'>
          <div className='flex items-center gap-3 px-4 py-2'>
            <span className='cursor-pointer'>
              <IoMdClose onClick={setChatModalClose} size={20} />
            </span>
            <span className='text-2xl font-semibold'>채팅</span>
          </div>
          <ul className='flex h-full max-w-[360px] flex-col overflow-y-auto'>
            {isLoading && <div className='my-10 text-center text-gray-400'>채팅창을 불러오는 중입니다...</div>}
            {chatList && chatList.length > 0
              ? chatList.map((chatItem) => (
                  <li
                    className={`flex gap-3 px-3 py-4 ${chatItem.id === activeRoomId ? 'bg-skyGray' : 'hover:bg-lightSkyGray'}`}
                    key={chatItem.id}
                    onClick={() => chatActiveHandler(chatItem)}
                  >
                    <div className='flex min-h-[49px] min-w-[49px] items-center justify-center rounded-full bg-gray-100'>
                      <ProfileImage
                        className='h-[49px] w-[49px] rounded-full object-cover'
                        src={chatItem.other_user_profile_image}
                      />
                    </div>
                    <div className='flex grow flex-col'>
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
                      <div className='flex items-center justify-between'>
                        <p className='max-w-[240px] grow truncate text-sm'>
                          {chatItem.latest_message ? chatItem.latest_message : ''}
                        </p>
                        {chatItem.unread_count && chatItem.unread_count > 0 ? (
                          <span className='flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-600 text-xs text-white'>
                            {chatItem.unread_count}
                          </span>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </li>
                ))
              : !isLoading && (
                  <div className='flex h-[300px] w-full flex-col items-center justify-center gap-8'>
                    <img className='max-h-[160px] max-w-[160px] rounded-full' src='/favicon.png' />
                    <p>비타에서 게임 메이트와 즐겁게 대화하며 즐겨보세요!</p>
                  </div>
                )}
          </ul>
        </div>
      </section>
      {chatList && chatList.length > 0 && (
        <section className='fixed right-0 top-0 h-full min-w-[420px] bg-skyGray' ref={chatMessageModalRef}>
          <ChatMessageModal />
        </section>
      )}
    </div>
  );
};

export default ChatModal;
