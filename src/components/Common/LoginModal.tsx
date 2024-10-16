import { useEffect } from "react";
import { useModalStore } from "../../config/store";

const { VITE_PUBLIC_BASE_URL } = import.meta.env;

export default function LoginModal() {
  const { setModalStatus } = useModalStore();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleBackdropClick = () => {
    setModalStatus("login", false);
  };

  const handleKakaoLoginClick = () => {
    window.location.href = `${VITE_PUBLIC_BASE_URL}/api/v1/users/kakao/login/`;
  };

  return (
    <div
      className='fixed left-0 right-0 top-0 bottom-0 bg-black bg-opacity-60 z-30 flex justify-center items-center'
      onClick={handleBackdropClick}
    >
      <div
        className='bg-white w-[300px] h-[300px] flex flex-col justify-center items-center gap-4 rounded-xl px-[20px] py-[12px]'
        onClick={(e) => e.stopPropagation()}
      >
        {/* 로고 */}
        <div>
          <img src='/src/assets/imgs/vitaLogo300.svg' alt='비타 로고' className='w-[60px] h-[60px]' />
        </div>
        <div className='text-center font-bold'>비타에서 게임 메이트와 즐겁게 대화하며 롤 듀오를 즐겨보세요!</div>
        <div className='flex flex-col justify-center gap-3'>
          <button onClick={handleKakaoLoginClick} className='border border-gray-200 rounded-[4px]'>
            <img src='/src/assets/imgs/google_login.svg' alt='구글 로그인 버튼' />
          </button>
          <button onClick={handleKakaoLoginClick}>
            <img src='/src/assets/imgs/kakao_login.svg' alt='카카오 로그인 버튼' />
          </button>
        </div>
      </div>
    </div>
  );
}
