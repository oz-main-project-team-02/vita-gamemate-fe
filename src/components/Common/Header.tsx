import { Link } from 'react-router-dom';
import { IoSearchSharp } from 'react-icons/io5';
import { useChatModalStore, useModalStore, useUserStore } from '../../config/store';
import LoginModal from './LoginModal';
import { useState } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { TiUser } from 'react-icons/ti';
import ProfileDropdown from './ProfileDropdown';
import GameDropdown from './GameDropdown';

export default function Header() {
  const { modalStatus, setModalStatus } = useModalStore();
  const [gameHover, setGameHover] = useState(false);
  const [profileHover, setProfileHover] = useState(false);
  const { user } = useUserStore();
  const setChatModalOpen = useChatModalStore((state) => state.setChatModalOpen);

  const handleLoginClick = () => {
    setModalStatus('login', true);
  };

  // 채팅 모달창 preloading
  const chatIconMouseEnterHandler = () => {
    import('../../components/Common/ChatModal');
  };

  return (
    <header className='flex items-center justify-between px-12'>
      <div className='flex gap-6 font-semibold text-primaryTextLight'>
        <Link to={'/'}>
          <div className='hover:text-primaryText'>홈페이지</div>
        </Link>
        <div
          onMouseEnter={() => setGameHover(true)}
          onMouseLeave={() => setGameHover(false)}
          className='hover:text-primaryText'
        >
          모든 서비스
        </div>
      </div>
      {gameHover && <GameDropdown setGameHover={setGameHover} />}
      <div className='text-[48px] font-bold'>
        VI<span className='text-white'>TA</span>
      </div>
      <div className='flex gap-6'>
        <div className='flex items-center'>
          {localStorage.getItem('accessToken') ? (
            <>
              <Link to={'/coin'}>
                <div className='flex items-center gap-2 rounded-md bg-slate-200 px-4 py-2'>
                  <img src='/src/assets/imgs/vitaCoin.svg' alt='비타코인' />
                  <span className='font-semibold'>{user.coin}</span>
                  <img src='/src/assets/imgs/button_plus.svg' alt='충전버튼' />
                </div>
              </Link>
              <button
                className='mr-6 flex h-[36px] w-[36px] items-center justify-center rounded-full bg-slate-200'
                onClick={setChatModalOpen}
                onMouseEnter={chatIconMouseEnterHandler}
              >
                <AiOutlineMessage size={24} />
              </button>
              <button
                onMouseEnter={() => setProfileHover(true)}
                onMouseLeave={() => setProfileHover(false)}
                className='flex h-[36px] w-[36px] items-center justify-center rounded-full bg-slate-200'
              >
                {user.profile_image ? (
                  <img
                    className='h-[36px] w-[36px] rounded-full object-cover'
                    src={user.profile_image}
                    alt='사용자 이미지'
                  />
                ) : (
                  <TiUser size={36} />
                )}
              </button>
              {profileHover && <ProfileDropdown user={user} setProfileHover={setProfileHover} />}
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
