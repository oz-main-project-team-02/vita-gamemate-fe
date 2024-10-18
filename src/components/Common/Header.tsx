import { Link } from 'react-router-dom';
import { IoSearchSharp } from 'react-icons/io5';
import { useModalStore, useUserStore } from '../../config/store';
import LoginModal from './LoginModal';
import { useState } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { TiUser } from 'react-icons/ti';
import ProfileDropdown from './ProfileDropdown';

export default function Header() {
  const { modalStatus, setModalStatus } = useModalStore();
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useUserStore();

  const handleLoginClick = () => {
    setModalStatus('login', true);
  };

  return (
    <header className='flex items-center justify-between px-12'>
      <div className='flex gap-6 font-semibold text-primaryTextLight'>
        <Link to={'/'}>
          <div className='hover:text-primaryText'>홈페이지</div>
        </Link>
        <div className='hover:text-primaryText'>모든 서비스</div>
      </div>
      <div className='text-[48px] font-bold'>
        VI<span className='text-white'>TA</span>
      </div>
      <div className='flex gap-6'>
        <div className='flex items-center'>
          {localStorage.getItem('accessToken') ? (
            <>
              <button className='mr-6 flex h-[36px] w-[36px] items-center justify-center rounded-full bg-slate-200'>
                <AiOutlineMessage size={24} />
              </button>
              <button
                onMouseEnter={() => setIsHovered(true)}
                className='flex h-[36px] w-[36px] items-center justify-center rounded-full bg-slate-200'
              >
                {user.profile_image ? <img src={user.profile_image} alt='사용자 이미지' /> : <TiUser size={36} />}
              </button>
              {isHovered && <ProfileDropdown setIsHovered={setIsHovered} />}
            </>
          ) : (
            <>
              <button onClick={handleLoginClick} className='font-semibold text-primaryTextLight hover:text-primaryText'>
                로그인
              </button>
            </>
          )}
        </div>
        <div className='flex items-center border-b border-b-primaryText'>
          <input type='search' className='w-24 border-none bg-transparent p-1 focus:outline-none' />
          <IoSearchSharp />
        </div>
      </div>
      {modalStatus.login && <LoginModal />}
    </header>
  );
}
