import { Link, useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { useModalStore, useUserStore } from "../../config/store";
import LoginModal from "./LoginModal";
import { client } from "../../api/client";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function Header() {
  const { modalStatus, setModalStatus } = useModalStore();
  const navigate = useNavigate();
  const { user, reset } = useUserStore();
  console.log(user);

  const handleLoginClick = () => {
    setModalStatus("login", true);
  };

  const handleLogoutClick = async () => {
    try {
      const response = await client.post("/api/v1/users/auth/logout/", { refresh_token: Cookies.get("refresh_token") });

      if (response.status === 200) {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        reset();
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 액세스 토큰 있을 경우, 사용자 정보 가져오기
  // useEffect(() => {
  //   const access_token = Cookies.get("access_token");
  //   if (access_token) {
  //     (async () => {
  //       try {
  //         const { data } = await client.get("/api/v1/users/me/");
  //         setUser(data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     })();
  //   }
  // }, [setUser]);

  return (
    <header className='flex items-center justify-between px-12'>
      <div className='flex gap-6 font-semibold text-primaryTextLight'>
        <Link to={"/"}>
          <div className='hover:text-primaryText'>홈페이지</div>
        </Link>
        <div className='hover:text-primaryText'>모든 서비스</div>
      </div>
      <div className='text-[48px] font-bold'>
        VI<span className='text-white'>TA</span>
      </div>
      <div className='flex gap-6'>
        <div className='flex items-center '>
          {/* {user ?  :} */}
          <button onClick={handleLoginClick} className='text-primaryTextLight font-semibold hover:text-primaryText'>
            로그인
          </button>
          <button onClick={handleLogoutClick} className='mx-5'>
            로그아웃
          </button>
        </div>
        <div className='flex items-center border-b border-b-primaryText'>
          <input type='search' className='bg-transparent border-none focus:outline-none p-1 w-24' />
          <IoSearchSharp />
        </div>
      </div>
      {modalStatus.login && <LoginModal />}
    </header>
  );
}
