import { Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { useModalStore, useUserStore } from "../../config/store";
import LoginModal from "./LoginModal";
import { client } from "../../api/client";
import { useEffect, useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { TiUser } from "react-icons/ti";
import ProfileDropdown from "./ProfileDropdown";

export default function Header() {
  const { modalStatus, setModalStatus } = useModalStore();
  const { user, setUser } = useUserStore();
  const [isHovered, setIsHovered] = useState(false);

  const handleLoginClick = () => {
    setModalStatus("login", true);
  };

  // 액세스 토큰 있을 경우, 사용자 정보 가져오기
  useEffect(() => {
    if (user.id === 0) {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        (async () => {
          try {
            const { data } = await client.post("/api/v1/users/profile/me/", {
              access_token: access_token,
            });
            setUser(data);
            console.log(data);
          } catch (error) {
            console.error(error);
          }
        })();
      }
    }
  }, [setUser, user.id]);

  return (
    <header className="flex items-center justify-between px-12">
      <div className="flex gap-6 font-semibold text-primaryTextLight">
        <Link to={"/"}>
          <div className="hover:text-primaryText">홈페이지</div>
        </Link>
        <div className="hover:text-primaryText">모든 서비스</div>
      </div>
      <div className="text-[48px] font-bold">
        VI<span className="text-white">TA</span>
      </div>
      <div className="flex gap-6">
        <div className="flex items-center ">
          {localStorage.getItem("access_token") ? (
            <>
              <button className="w-[36px] h-[36px] bg-slate-200 rounded-full flex items-center justify-center mr-6">
                <AiOutlineMessage size={24} />
              </button>
              <button
                onMouseEnter={() => setIsHovered(true)}
                className="w-[36px] h-[36px] bg-slate-200 rounded-full flex items-center justify-center"
              >
                {user.profile_image ? (
                  <img src={user.profile_image} alt="사용자 이미지" />
                ) : (
                  <TiUser size={36} />
                )}
              </button>
              {isHovered && <ProfileDropdown setIsHovered={setIsHovered} />}
            </>
          ) : (
            <>
              <button
                onClick={handleLoginClick}
                className="text-primaryTextLight font-semibold hover:text-primaryText"
              >
                로그인
              </button>
            </>
          )}
        </div>
        <div className="flex items-center border-b border-b-primaryText">
          <input
            type="search"
            className="bg-transparent border-none focus:outline-none p-1 w-24"
          />
          <IoSearchSharp />
        </div>
      </div>
      {modalStatus.login && <LoginModal />}
    </header>
  );
}
