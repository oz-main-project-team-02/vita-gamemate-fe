import { useCallback, useEffect, useRef, useState } from 'react';
import { MateGameInfo, User, ChatMessage, ChatList } from '../../config/types';
import { useChatStore, useOrderModalStore } from '../../config/store';
import ChatSubmitForm from './ChatSubmitForm';
import ProfileImage from './ProfileImage';
import ChatRenderMessages from './ChatRenderMessages';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchChatMessages } from '@/api/chat';
import { fetchUserProfileById } from '@/api/user';
import useChatRoomWebSocket from '@/hooks/useChatRoomWebSocket';
import ChatMateRequestInfo from './ChatMateRequestInfo';
import { useWebSocketListener } from '@/hooks/useWebSocketListener';
import { AxiosError } from 'axios';

const ChatMessageModal = () => {
  const chatRoomWebSocket = useChatRoomWebSocket();
  const queryClient = useQueryClient();
  const { activeRoomId, otherUserId, otherUserNickname, otherUserProfileImage } = useChatStore();
  const { isOrderModalOpen, setOrderModalOpen } = useOrderModalStore();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [mate, setMate] = useState<User | null>(null);
  const [mateGameInfo, setMateGameInfo] = useState<MateGameInfo[] | null>(null);
  const [chatRoomPages, setChatRoomPages] = useState<Record<number, number>>({});
  const scrollRef = useRef<HTMLUListElement | null>(null);
  const prevScrollHeightRef = useRef<number>(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);

  // 채팅방별 페이지 상태 업데이트
  const updateChatRoomPage = useCallback((roomId: number, page: number) => {
    setChatRoomPages((prev) => ({ ...prev, [roomId]: page }));
  }, []);

  // 채팅 메세지 초기 로딩
  const loadInitialChatHistory = useCallback(async () => {
    if (activeRoomId) {
      setIsInitialLoading(true);
      try {
        const fetchedMessages = await fetchChatMessages(activeRoomId, 1);
        setChatMessages(fetchedMessages);
        updateChatRoomPage(activeRoomId, 1);
        setHasMoreMessages(fetchedMessages.length === 20);
        // 초기 로드 후 스크롤을 맨 아래로
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        }, 0);
      } catch (error) {
        console.error('채팅방 초기 로딩 실패: ', error);
        setChatMessages([]);
        setHasMoreMessages(false);
      } finally {
        setIsInitialLoading(false);
      }
    }
  }, [activeRoomId, updateChatRoomPage]);

  // 채팅 메세지 초기화 및 새로운 메세지 로드
  useEffect(() => {
    loadInitialChatHistory();
    setMate(null);
    setMateGameInfo(null);
  }, [activeRoomId, loadInitialChatHistory]);

  // 페이지네이션 추가 메세지 불러오기
  const loadMoreMessages = useCallback(async () => {
    if (activeRoomId && scrollRef.current && hasMoreMessages && !isInitialLoading) {
      try {
        prevScrollHeightRef.current = scrollRef.current.scrollHeight; // 현재 스크롤 높이 저장

        const currentPage = chatRoomPages[activeRoomId] || 1;
        const fetchedMessages = await fetchChatMessages(activeRoomId, currentPage + 1);

        if (fetchedMessages.length > 0) {
          setChatMessages((prevMessages) => [...fetchedMessages, ...prevMessages]);
          updateChatRoomPage(activeRoomId, currentPage + 1);
          setHasMoreMessages(fetchedMessages.length === 20);
        } else {
          setHasMoreMessages(false);
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response && error.response.status === 404) {
          console.log('메세지 추가 로드 실패 (404 error)');
          setHasMoreMessages(false);
        } else {
          console.error('메세지 추가 로드 실패: ', error);
        }
      }
    }
  }, [activeRoomId, chatRoomPages, updateChatRoomPage, hasMoreMessages, isInitialLoading]);

  // WebSocket을 통한 실시간 메시지 추가
  useWebSocketListener<ChatMessage>(chatRoomWebSocket, (data) => {
    if (data.message) {
      const newId = chatMessages.length > 0 ? chatMessages[chatMessages.length - 1].id + 1 : 1;
      const newMessage = { ...data, id: newId };

      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log('chatMessages:', chatMessages);

      // 채팅 목록 업데이트
      queryClient.setQueryData(['chatList'], (oldChatList: ChatList[] | undefined) => {
        if (!oldChatList) return oldChatList;

        const updatedList = oldChatList.map((chat) =>
          chat.id === activeRoomId
            ? {
                ...chat,
                latest_message: data.message,
                latest_message_time: data.timestamp,
              }
            : chat
        );

        return updatedList.sort(
          (a, b) => new Date(b.latest_message_time).getTime() - new Date(a.latest_message_time).getTime()
        );
      });

      // 새 메세지가 추가되면 스크롤을 맨 아래로
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 20; // 20px 여유를 둠
        if (isScrolledToBottom) {
          setTimeout(() => {
            if (scrollRef.current) {
              scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
          }, 0);
        }
      }
    }
  });

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    if (scrollRef.current && scrollRef.current.scrollTop === 0 && hasMoreMessages && !isInitialLoading) {
      loadMoreMessages();
    }
  }, [loadMoreMessages, hasMoreMessages, isInitialLoading]);

  // 스크롤 이벤트 등록
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll, isInitialLoading]);

  // 채팅창 스크롤 조정
  useEffect(() => {
    if (scrollRef.current && prevScrollHeightRef.current) {
      const newScrollHeight = scrollRef.current.scrollHeight;
      scrollRef.current.scrollTop = newScrollHeight - prevScrollHeightRef.current;
      prevScrollHeightRef.current = 0;
    }
  }, [chatMessages]);

  // 메이트 프로필 조회
  const { data: mateData } = useQuery<User, Error>({
    queryKey: ['mateInfo', otherUserId],
    queryFn: () => fetchUserProfileById(otherUserId?.toString() as string).then((response) => response.data),
    enabled: !!otherUserId,
  });

  // 메이트 정보
  useEffect(() => {
    if (mateData?.is_mate && mateData?.mate_game_info) {
      setMate(mateData);
      setMateGameInfo(mateData.mate_game_info);
    }
  }, [mateData]);

  return (
    <div className='flex h-full max-w-[420px] flex-col shadow-sm'>
      {/* Header */}
      {otherUserNickname && (
        <div className='flex flex-col'>
          <div className='flex items-center gap-4 px-4 py-2'>
            <ProfileImage
              className='rounded-ful h-[49px] w-[49px] rounded-full object-cover'
              src={otherUserProfileImage}
            />
            <span className='max-w-[323px] grow truncate text-lg font-semibold'>{otherUserNickname}</span>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <ul className='flex h-full max-w-[420px] flex-col overflow-y-auto' ref={scrollRef}>
        {mateGameInfo && (
          <ChatMateRequestInfo
            mate={mate}
            isOrderModalOpen={isOrderModalOpen}
            mateGameInfo={mateGameInfo}
            setOrderModalOpen={setOrderModalOpen}
          />
        )}
        {chatMessages.length === 0 && (
          <div className='my-10 flex w-full flex-col items-center justify-center text-gray-400'>
            <p>채팅방 내역을 불러오는 중 오류가 발생했습니다.</p>
            <p>새로고침 후 다시 시도해주세요.</p>
          </div>
        )}
        {chatMessages.length > 0 && <ChatRenderMessages chatMessages={chatMessages} />}
      </ul>

      {/* Chat Input */}
      <ChatSubmitForm />

      {/* Order Modal */}
      {/* FIXME: selectGame이 추가되어야함, mateGameInfo가 0번 인덱스의 값으로 설정되어 있음. 추후 모든 게임 인포를 제공하고 선택한 게임의 info를 selectGame으로 넘겨주면됨. */}
      {/* {isOrderModalOpen && mate && <OrderModal selectGame={mateGameInfo!} mate={mate} />} */}
    </div>
  );
};

export default ChatMessageModal;
