import { useEffect } from 'react';
import { useModalStore } from '../../config/store';
import vitaLogo300 from '@/assets/imgs/vitaLogo300.svg';
import kakaoLogin from '@/assets/imgs/kakao_login.svg';

export default function LoginModal() {
  const { setModalStatus } = useModalStore();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleBackdropClick = () => {
    setModalStatus('login', false);
  };

  const handleKakaoLoginClick = () => {
    const KAKAO_AUTH_URL = `${import.meta.env.VITE_KAKAO_BASE_URL}?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(import.meta.env.VITE_KAKAO_REDIRECT_URI)}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60'
      onClick={handleBackdropClick}
    >
      <div
        className='flex h-[300px] w-[300px] flex-col items-center justify-center gap-4 rounded-xl bg-white px-[20px] py-[12px]'
        onClick={(e) => e.stopPropagation()}
      >
        {/* 로고 */}
        <div>
          <img src={vitaLogo300} alt='비타 로고' className='h-[60px] w-[60px]' />
        </div>
        <div className='mb-4 text-center font-bold'>비타에서 게임 메이트와 즐겁게 대화하며 롤 듀오를 즐겨보세요!</div>
        <button onClick={handleKakaoLoginClick}>
          <img src={kakaoLogin} alt='카카오 로그인 버튼' />
        </button>
      </div>
    </div>
  );
}
