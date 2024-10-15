import { useEffect } from "react";
import { useModalStore } from "../../config/store";

export default function LoginModal() {
  const { setStatus } = useModalStore();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleBackdropClick = () => {
    setStatus("login", false);
  };

  const handleGoogleLoginClick = () => {
    window.location.href = `${
      import.meta.env.VITE_PUBLIC_BASE_URL
    }/api/v1/users/google/login`;
  };

  return (
    <div
      className='fixed left-0 right-0 top-0 bottom-0 bg-black bg-opacity-60 z-30 flex justify-center items-center'
      onClick={handleBackdropClick}
    >
      <div
        className='bg-white w-[300px] h-[300px] flex flex-col justify-center items-center rounded-xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex flex-col justify-center'>
          <button onClick={handleGoogleLoginClick}>
            <img
              src='/src/assets/imgs/google_login.svg'
              alt='구글 로그인 버튼'
            />
          </button>
          <button onClick={handleGoogleLoginClick}>
            <img
              src='/src/assets/imgs/kakao_login.svg'
              alt='카카오 로그인 버튼'
            />
          </button>
        </div>
      </div>
    </div>
  );
}
