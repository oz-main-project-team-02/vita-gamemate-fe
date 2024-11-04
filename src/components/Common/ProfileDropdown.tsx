import { SlArrowRight } from 'react-icons/sl';
import { FaRegUser } from 'react-icons/fa';
import { LuGamepad2 } from 'react-icons/lu';
import { PiCoins } from 'react-icons/pi';
import { SlNotebook } from 'react-icons/sl';
import { TbLogout2 } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/config/store';
import { User } from '@/config/types';
import { authApi } from '@/api';
import { MdOutlinePayment } from 'react-icons/md';
import userImage from '/favicon.png';

type HoverProps = {
  user: User;
  setProfileHover: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProfileDropdown({ user, setProfileHover }: HoverProps) {
  const navigate = useNavigate();
  const { unSetUser } = useUserStore();

  const handleLogoutClick = async () => {
    try {
      const response = await authApi.logout();

      if (response.status === 200) {
        localStorage.removeItem('accessToken');
        unSetUser();
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onMouseEnter={() => setProfileHover(true)}
      onMouseLeave={() => setProfileHover(false)}
      className='absolute right-[45px] top-[40px] z-30 h-[400px] w-[17%] min-w-[300px] py-8'
    >
      <div className='z-20 w-full rounded-3xl bg-[#FFFFFF] p-5 shadow'>
        {/* 사용자 정보 링크 */}
        <Link
          to={`/user/${user.id}`}
          className='mb-3 flex h-[60px] w-full cursor-pointer items-center rounded-full hover:bg-slate-50'
        >
          <div className='h-[50px] w-[50px] rounded-full bg-slate-200'>
            <img
              className='h-[50px] w-[50px] rounded-full object-cover'
              src={user.profile_image ?? userImage}
              alt='사용자 이미지'
            />
          </div>
          <div className='ml-2 h-[50px] w-[230px] pt-1'>
            <p className='text-[15px]'>{user.nickname}</p>
            <p className='text-sm text-gray-400'>{user.email}</p>
          </div>
          <div className='text-gray-300'>
            <SlArrowRight />
          </div>
        </Link>
        <hr />
        {/* TODO: 컴포넌트화 충분히 가능해보임 아래 링크들 */}
        {/* 마이페이지 링크 */}
        <Link
          to={`/user/edit-info`}
          className='mt-3 flex h-[40px] w-full cursor-pointer items-center justify-between hover:pl-1'
        >
          <div className='h-[20px] w-[20px]'>
            <FaRegUser size={20} />
          </div>
          <p className='ml-[10px] w-full'>마이 페이지</p>
          <div className='float-right text-sm text-gray-300'>
            <SlArrowRight />
          </div>
        </Link>

        {/* 게임메이트 등록 링크 */}
        <Link
          to={'/user/gamemate'}
          className='my-2 flex h-[40px] w-full cursor-pointer items-center justify-between hover:pl-1'
        >
          <div className='h-[20px] w-[20px]'>
            <LuGamepad2 size={20} />
          </div>
          <p className='ml-[10px] w-full'>게임 메이트 등록</p>
          <div className='float-right text-sm text-gray-300'>
            <SlArrowRight />
          </div>
        </Link>

        {/* 나의 코인 링크 */}
        <Link
          to={'/user/coin'}
          className='my-2 flex h-[40px] w-full cursor-pointer items-center justify-between hover:pl-1'
        >
          <div className='h-[20px] w-[20px]'>
            <PiCoins size={20} />
          </div>
          <p className='ml-[10px] w-full'>나의 코인</p>
          <div className='float-right text-xs text-gray-300'>
            <SlArrowRight />
          </div>
        </Link>

        {/* 의뢰 링크 */}
        <Link
          to={'/user/orders'}
          className='mb-3 flex h-[40px] w-full cursor-pointer items-center justify-between hover:pl-1'
        >
          <div className='h-[20px] w-[20px]'>
            <SlNotebook size={20} />
          </div>
          <p className='ml-[10px] w-full'>의뢰</p>
          <button className='float-right text-sm text-gray-300'>
            <SlArrowRight />
          </button>
        </Link>

        {/* 결제 내역 */}
        <Link
          to={'/user/payments'}
          className='mb-3 flex h-[40px] w-full cursor-pointer items-center justify-between hover:pl-1'
        >
          <div className='h-[20px] w-[20px]'>
            <MdOutlinePayment size={20} />
          </div>
          <p className='ml-[10px] w-full'>결제 내역</p>
          <button className='float-right text-sm text-gray-300'>
            <SlArrowRight />
          </button>
        </Link>
        <hr />
        {/* 로그아웃 버튼 */}
        <div
          onClick={handleLogoutClick}
          className='my-3 flex h-[40px] w-full cursor-pointer items-center justify-between hover:pl-1'
        >
          <div className='h-[20px] w-[20px]'>
            <TbLogout2 size={20} />
          </div>
          <p className='ml-[10px] w-full cursor-pointer'>로그아웃</p>
        </div>
      </div>
    </div>
  );
}
