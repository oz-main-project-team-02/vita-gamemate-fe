import { SlArrowRight } from 'react-icons/sl';
import { FaRegUser } from 'react-icons/fa';
import { LuGamepad2 } from 'react-icons/lu';
import { PiCoins } from 'react-icons/pi';
import { SlNotebook } from 'react-icons/sl';
import { TbLogout2 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { client } from '../../api/client';
import { useUserStore } from '../../config/store';

interface HoverProps {
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileDropdown({ setIsHovered }: HoverProps) {
  const navigate = useNavigate();
  const { reset } = useUserStore();

  const handleLogoutClick = async () => {
    try {
      const response = await client.post('/api/v1/users/auth/logout/');

      if (response.status === 200) {
        localStorage.removeItem('accessToken');
        reset();
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='absolute right-[48px] top-[40px] z-20 mt-8 h-[370px] w-1/6 rounded-3xl bg-[#FFFFFF] p-5 shadow'
    >
      <div className='mb-3 flex h-[60px] w-full items-center'>
        <div className='h-[50px] w-[50px] rounded-full bg-slate-200'>
          <img className='h-[50px] w-[50px] rounded-full' src='/src/assets/imgs/user.png' alt='user' />
        </div>
        <div className='ml-2 h-[50px] w-[200px] pt-1'>
          <p className='text-[15px]'>닉네임</p>
          <p className='text-sm text-gray-400'>아이디</p>
        </div>
        <button onClick={() => navigate('/user/:userId')} className='text-gray-300 hover:text-lg'>
          <SlArrowRight />
        </button>
      </div>
      <hr />
      <div className='mt-3 flex h-[40px] w-full items-center justify-between'>
        <div className='h-[20px] w-[20px]'>
          <FaRegUser size={20} />
        </div>
        <p className='ml-[10px] w-full'>마이 페이지</p>
        <button
          onClick={() => navigate('/user/edit-info')}
          className='float-right text-sm text-gray-300 hover:text-base'
        >
          <SlArrowRight />
        </button>
      </div>
      <div className='my-2 flex h-[40px] w-full items-center justify-between'>
        <div className='h-[20px] w-[20px]'>
          <LuGamepad2 size={20} />
        </div>
        <p className='ml-[10px] w-full'>게임 메이트 등록</p>
        <button
          onClick={() => navigate('/user/gamemate')}
          className='float-right text-sm text-gray-300 hover:text-base'
        >
          <SlArrowRight />
        </button>
      </div>
      <div className='my-2 flex h-[40px] w-full items-center justify-between'>
        <div className='h-[20px] w-[20px]'>
          <PiCoins size={20} />
        </div>
        <p className='ml-[10px] w-full'>나의 코인</p>
        <button onClick={() => navigate('/coin')} className='float-right text-xs text-gray-300'>
          <SlArrowRight />
        </button>
      </div>
      <div className='mb-3 flex h-[40px] w-full items-center justify-between'>
        <div className='h-[20px] w-[20px]'>
          <SlNotebook size={20} />
        </div>
        <p className='ml-[10px] w-full'>의뢰</p>
        <button onClick={() => navigate('/user/orders')} className='float-right text-sm text-gray-300 hover:text-base'>
          <SlArrowRight />
        </button>
      </div>
      <hr />
      <div className='my-3 flex h-[40px] w-full items-center justify-between'>
        <div className='h-[20px] w-[20px]'>
          <TbLogout2 size={20} />
        </div>
        <p onClick={handleLogoutClick} className='ml-[10px] w-full cursor-pointer'>
          로그아웃
        </p>
      </div>
    </div>
  );
}
