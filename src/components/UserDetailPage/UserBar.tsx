import { AiOutlineMessage } from 'react-icons/ai';
import Gender from '../Common/Gender';
import OnlineFlag from '../Common/OnlineFlag';
import { useChatModalStore, useChatStore, useModalStore, useUserStore } from '@/config/store';
import { ChatList, User } from '@/config/types';
import { createChat } from '@/api/chat';
import userImage from '/favicon.png';
import { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  mate: User;
  userId: string | undefined;
};

export default function UserBar({ mate, userId }: Props) {
  const user = useUserStore((state) => state.user);
  const setChatModalOpen = useChatModalStore((state) => state.setChatModalOpen);
  const setModalStatus = useModalStore((state) => state.setModalStatus);
  const setActiveRoomId = useChatStore((state) => state.setActiveRoomId);
  const queryClient = useQueryClient();

  // 채팅방 생성 api 요청 후 채팅 모달 open
  const createChatHandler = async (mateNickname: string | null) => {
    if (!mateNickname || mateNickname === user.nickname) return;

    try {
      const response = await createChat(mateNickname);
      if (response.status === 200 || response.status === 201) {
        const newRoomId = response.data.id;
        setActiveRoomId(newRoomId);

        // 채팅 목록 강제 리프레시
        queryClient.invalidateQueries({ queryKey: ['chatList'] });

        // 채팅 목록 수동 업데이트
        queryClient.setQueryData(['chatList'], (oldData: ChatList[] | undefined) => {
          if (!oldData) return [response.data];
          return [response.data, ...oldData].sort(
            (a, b) => new Date(b.latest_message_time).getTime() - new Date(a.latest_message_time).getTime()
          );
        });

        setChatModalOpen();
      } else {
        console.error('채팅방 생성 실패');
        alert('채팅창을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } catch (error) {
      switch (error instanceof AxiosError && error.status) {
        case 401:
          setModalStatus('login', true);
          break;
        case 400:
        case 404:
          alert('채팅창을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
          console.error('채팅 생성 요청 실패: ', error);
          break;
        default:
          console.error(error);
          break;
      }
    }
  };

  // 채팅 모달창 preloading
  const chatIconMouseEnterHandler = () => {
    import('@/components/Common/ChatModal');
  };

  return (
    <div className='relative mb-[48px] flex h-[127px] w-[350px] rounded-3xl border bg-[#FFFFFF] px-[37px] py-[27px] sm:w-[500px] md:w-[700px] lg:w-[900px] xl:w-[1000px]'>
      <div className='h-[70px] w-[70px] rounded-full border bg-slate-50'>
        <img className='h-[70px] w-[70px] rounded-full object-cover' src={mate.profile_image ?? userImage} alt='user' />
      </div>
      <div className='mx-5 flex h-[75px] w-auto flex-col'>
        <p className='mb-[1px] font-medium'>{mate.nickname}</p>
        <div className='relative flex h-[20px] w-full items-start'>
          {mate.gender && <Gender gender={mate.gender!} birthday={mate.birthday} />}
          <div className='relative ml-[-8px] mt-[-9px] w-[100px]'>{mate.is_online && <OnlineFlag />}</div>
        </div>
        <div className='mt-2 flex items-center'>
          <div className='h-[20px] w-[40px] rounded-xl bg-gray-200 pl-[15px] text-sm text-[#FFFFFF]'>id</div>
          <p className='ml-2 text-sm text-gray-200'>{mate.id}</p>
        </div>
      </div>
      {user.id !== Number(userId) && (
        <button
          className='absolute right-[40px] my-4 flex h-[36px] w-[36px] items-center justify-center rounded-full bg-slate-200'
          onClick={() => createChatHandler(mate.nickname)}
          onMouseEnter={chatIconMouseEnterHandler}
        >
          <AiOutlineMessage size={24} />
        </button>
      )}
    </div>
  );
}
