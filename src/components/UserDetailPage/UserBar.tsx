import { AiOutlineMessage } from 'react-icons/ai';
import Gender from '../Common/Gender';
import OnlineFlag from '../Common/OnlineFlag';
import { useChatModalStore, useUserStore } from '@/config/store';
import { User } from '@/config/types';
import { createChat } from '@/api/chat';

type Props = {
  mate: User;
  userId: string | undefined;
};

export default function UserBar({ mate, userId }: Props) {
  const user = useUserStore((state) => state.user);
  const setChatModalOpen = useChatModalStore((state) => state.setChatModalOpen);

  // 채팅방 생성 api 요청 후 채팅 모달 open
  const createChatHandler = async (mateNickname: string | null) => {
    if (mateNickname) {
      try {
        const response = await createChat(mateNickname);
        console.log(response.data);

        if (response.status === 200 || response.status === 201) {
          setChatModalOpen();
        } else {
          console.log('채팅방 생성 실패');
          alert('채팅창을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
      } catch (error) {
        console.error('채팅방 생성 요청 실패: ', error);
        alert('채팅창을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
    return;
  };

  return (
    <div className='relative mb-[48px] flex h-[127px] w-[1000px] rounded-3xl border bg-[#FFFFFF] px-[37px] py-[27px]'>
      <div className='h-[70px] w-[70px] rounded-full border bg-slate-50'>
        <img
          className='h-[70px] w-[70px] rounded-full object-cover'
          src={mate.profile_image ? mate.profile_image : '/src/assets/imgs/user.png'}
          alt='user'
        />
      </div>
      <div className='mx-5 flex h-[75px] w-auto flex-col'>
        <p className='mb-[1px] font-medium'>{mate.nickname}</p>
        <div className='relative flex h-[20px] w-full items-start'>
          {mate.gender ? <Gender gender={mate.gender!} birthday={mate.birthday} /> : null}
          <div className='relative ml-[-8px] mt-[-9px] w-[100px]'>{mate.is_online ? <OnlineFlag /> : null}</div>
        </div>
        <div className='mt-2 flex items-center'>
          <div className='h-[20px] w-[40px] rounded-xl bg-gray-200 pl-[15px] text-sm text-[#FFFFFF]'>id</div>
          <p className='ml-2 text-sm text-gray-200'>{mate.id}</p>
        </div>
      </div>
      {user.id !== Number(userId) ? (
        <button className='absolute right-[40px] my-4 flex h-[36px] w-[36px] items-center justify-center rounded-full bg-slate-200'>
          {<AiOutlineMessage size={24} onClick={() => createChatHandler(mate.nickname)} />}
        </button>
      ) : null}
    </div>
  );
}
