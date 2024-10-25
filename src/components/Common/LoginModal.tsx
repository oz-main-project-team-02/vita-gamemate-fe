import { useEffect } from 'react';
import { useModalStore } from '../../config/store';

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
    window.location.href = import.meta.env.VITE_KAKAO_URI;
  };

  return (
    <div
      className='fixed bottom-0 left-0 right-0 top-0 z-30 flex items-center justify-center bg-black bg-opacity-60'
      onClick={handleBackdropClick}
    >
      <div
        className='flex h-[300px] w-[300px] flex-col items-center justify-center gap-4 rounded-xl bg-white px-[20px] py-[12px]'
        onClick={(e) => e.stopPropagation()}
      >
        {/* 로고 */}
        <div>
          <img src='/src/assets/imgs/vitaLogo300.svg' alt='비타 로고' className='h-[60px] w-[60px]' />
        </div>
        <div className='mb-4 text-center font-bold'>비타에서 게임 메이트와 즐겁게 대화하며 롤 듀오를 즐겨보세요!</div>
        <button onClick={handleKakaoLoginClick}>
          <img src='/src/assets/imgs/kakao_login.svg' alt='카카오 로그인 버튼' />
        </button>
      </div>
    </div>
  );
}
