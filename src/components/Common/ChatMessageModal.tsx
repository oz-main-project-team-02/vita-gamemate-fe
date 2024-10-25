import { useEffect, useRef, useState } from 'react';
import { Participant, MateGameInfo, User, Message } from '../../config/types';
import { socketStore, useChatStore, useOrderModalStore } from '../../config/store';
import ChatSubmitForm from './ChatSubmitForm';
import ProfileImage from './ProfileImage';
import ChatRenderMessages from './ChatRenderMessages';
import { useQuery } from '@tanstack/react-query';
import { fetchChatMessages } from '../../api/chat';
import { fetchUserProfileById } from '@/api/user';
import { getGame } from '@/config/const';
import { OrderModal } from './OrderModal';
import useSocket from '@/api/socket';

const ChatMessageModal = () => {
  const socket = useSocket();
  const setSocket = socketStore((state) => state.setSocket);
  const { selectedRoomId, otherUserId, otherUserNickname, otherUserProfileImage } = useChatStore();
  const { isOrderModalOpen, setOrderModalOpen } = useOrderModalStore();
  const [chatData, setChatData] = useState<{ participants: Participant[]; messages: Message[] | null } | null>(null);
  const [mate, setMate] = useState<User | null>(null);
  const [mateGameInfo, setMateGameInfo] = useState<MateGameInfo | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // WebSocket으로 채팅 내역 불러오기
  useEffect(() => {
    if (socket && selectedRoomId) {
      setSocket(socket);
      fetchChatMessages(socket, selectedRoomId, (data) => {
        setChatData(data);
      });
    }
  }, [socket, selectedRoomId]);

  // 메이트 프로필 조회
  const { data: mateData, isSuccess } = useQuery<User, Error>({
    queryKey: ['mateInfo', otherUserId],
    queryFn: () => fetchUserProfileById(otherUserId?.toString() as string).then((response) => response.data),
    enabled: !!otherUserId,
  });

  // 메이트 정보
  useEffect(() => {
    if (isSuccess && mateData?.is_mate && mateData?.mate_game_info) {
      setMate(mateData);
      setMateGameInfo(mateData.mate_game_info[0]);
    }
  }, [isSuccess, mateData]);

  // 채팅창 스크롤 조정
  useEffect(() => {
    if (chatData && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatData]);

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
        {mateGameInfo && (
          <div className='sticky top-0 mx-3 flex items-center gap-3 rounded-xl bg-white px-4 py-2'>
            <img className='h-[75px] w-[75px] object-contain' src={getGame(mateGameInfo.game_id)?.gameCardImg} />
            <div className='flex min-w-[180px] grow flex-col gap-[1px]'>
              <span className='max-w-[192px] truncate font-semibold'>{getGame(mateGameInfo.game_id)?.title}</span>
              <span className='max-w-[192px] truncate text-sm text-gray-300'>
                {mateGameInfo.level ? mateGameInfo.level : mateGameInfo.description}
              </span>
              <div className='flex items-center gap-1'>
                <img className='h-5 w-5 rounded-full' src='/favicon.png' />
                <span className='font-semibold text-primary'>{mateGameInfo.request_price}</span>
                <span className='text-sm text-gray-300'>/판</span>
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <button
                className='rounded-lg bg-gradient-to-r from-limeGreen to-primary px-4 py-1 font-semibold'
                onClick={setOrderModalOpen}
              >
                의뢰
              </button>
            </div>
          </div>
        )}
        {!chatData && (
          <div className='my-10 flex w-full flex-col items-center justify-center text-gray-400'>
            <p>채팅방 내역을 불러오는 중 오류가 발생했습니다.</p>
            <p>새로고침 후 다시 시도해주세요.</p>
          </div>
        )}
        {chatData?.messages && chatData?.messages.length > 0 && (
          <section>
            <ChatRenderMessages chatMessages={chatData.messages} />
          </section>
        )}
      </div>
      <ChatSubmitForm />
      {isOrderModalOpen && mate && <OrderModal mate={mate} />}
    </div>
  );
};

export default ChatMessageModal;
