import { useEffect, useRef, useState } from 'react';
import { MateGameInfo, User, ChatMessage } from '../../config/types';
import { useChatStore, useOrderModalStore } from '../../config/store';
import ChatSubmitForm from './ChatSubmitForm';
import ProfileImage from './ProfileImage';
import ChatRenderMessages from './ChatRenderMessages';
import { useQuery } from '@tanstack/react-query';
import { fetchChatMessages } from '@/api/chat';
import { fetchUserProfileById } from '@/api/user';
import { OrderModal } from './OrderModal';
import useChatRoomWebSocket from '@/hooks/useChatRoomWebSocket';
import ChatMateRequestInfo from './ChatMateRequestInfo';
import { useWebSocketListener } from '@/hooks/useWebSocketListener';

const ChatMessageModal = () => {
  const chatRoomWebSocket = useChatRoomWebSocket();
  const { selectedRoomId, otherUserId, otherUserNickname, otherUserProfileImage } = useChatStore();
  const { isOrderModalOpen, setOrderModalOpen } = useOrderModalStore();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [mate, setMate] = useState<User | null>(null);
  const [mateGameInfo, setMateGameInfo] = useState<MateGameInfo | null>(null);
  const [page, setPage] = useState(1);
  const [moreMessages, setMoreMessages] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // 초기 채팅 내역 불러오기
  useEffect(() => {
    const loadChatHistory = async () => {
      if (selectedRoomId && page === 1) {
        const fetchedMessages = await fetchChatMessages(selectedRoomId, page);
        setChatMessages(fetchedMessages);
      }
    };
    loadChatHistory();
  }, [selectedRoomId, page]);

  // 페이지네이션을 위한 추가 메세지 불러오기 함수
  const loadMoreMessages = async () => {
    if (selectedRoomId && moreMessages) {
      const fetchedMessages = await fetchChatMessages(selectedRoomId, page + 1);
      if (fetchedMessages.length > 0) {
        setChatMessages((prevMessages) => [...fetchedMessages, ...prevMessages]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setMoreMessages(false);
      }
    }
  };

  // WebSocket을 통한 실시간 메시지 추가
  useWebSocketListener<ChatMessage>(chatRoomWebSocket, (data) => {
    if (data.message) {
      const newId = chatMessages.length > 0 ? chatMessages[chatMessages.length - 1].id + 1 : 1;
      const newMessage = { ...data, id: newId };

      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log('chatMessages:', chatMessages);
    }
  });

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (scrollRef.current && scrollRef.current.scrollTop === 0) {
      loadMoreMessages();
    }
  };

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
  }, []);

  // 채팅창 스크롤 조정
  useEffect(() => {
    if (chatMessages.length > 0 && page === 1 && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // 메이트 프로필 조회
  const { data: mateData } = useQuery<User, Error>({
    queryKey: ['mateInfo', otherUserId],
    queryFn: () => fetchUserProfileById(otherUserId?.toString() as string).then((response) => response.data),
    enabled: !!otherUserId,
  });

  // otherUserId가 변경될 때 상태 초기화
  useEffect(() => {
    setMate(null);
    setMateGameInfo(null);
  }, [otherUserId]);

  // 메이트 정보
  useEffect(() => {
    if (mateData?.is_mate && mateData?.mate_game_info) {
      setMate(mateData);
      setMateGameInfo(mateData.mate_game_info[0]);
    }
  }, [mateData]);

  return (
    <div className='flex h-full max-w-[420px] flex-col shadow-sm'>
      {otherUserNickname && (
        <div className='flex flex-col'>
          <div className='flex items-center gap-4 px-4 py-2'>
            <ProfileImage className='max-h-[49px] max-w-[49px] rounded-full' src={otherUserProfileImage} />
            <span className='max-w-[323px] grow truncate text-lg font-semibold'>{otherUserNickname}</span>
          </div>
        </div>
      )}
      <div className='flex h-full max-w-[420px] flex-col overflow-y-auto' ref={scrollRef}>
        {mateGameInfo && <ChatMateRequestInfo mateGameInfo={mateGameInfo} setOrderModalOpen={setOrderModalOpen} />}
        {chatMessages.length === 0 && (
          <div className='my-10 flex w-full flex-col items-center justify-center text-gray-400'>
            <p>채팅방 내역을 불러오는 중 오류가 발생했습니다.</p>
            <p>새로고침 후 다시 시도해주세요.</p>
          </div>
        )}
        {chatMessages.length > 0 && (
          <section>
            <ChatRenderMessages chatMessages={chatMessages} />
          </section>
        )}
      </div>
      <ChatSubmitForm />
      {isOrderModalOpen && mate && <OrderModal mate={mate} />}
    </div>
  );
};

export default ChatMessageModal;
