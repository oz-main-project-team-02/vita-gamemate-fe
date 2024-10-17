import { SlArrowRight } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
import { LuGamepad2 } from "react-icons/lu";
import { PiCoins } from "react-icons/pi";
import { SlNotebook } from "react-icons/sl";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

interface HoverProps {
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Dropdown({ setIsHovered }: HoverProps) {
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-1/6 h-[370px] mt-8 p-5 absolute top-[40px] right-[48px] rounded-3xl bg-[#FFFFFF] shadow z-20"
    >
      <div className="w-full h-[60px] mb-3 flex items-center">
        <div className="w-[50px] h-[50px] rounded-full bg-slate-200">
          <img
            className="w-[50px] h-[50px] rounded-full"
            src="/src/assets/imgs/user.png"
            alt="user"
          />
        </div>
        <div className="w-[200px] h-[50px] ml-2 pt-1">
          <p className="text-[15px]">닉네임</p>
          <p className="text-gray-400 text-sm">아이디</p>
        </div>
        <button
          onClick={() => navigate("/user/:userId")}
          className=" text-gray-300 hover:text-lg"
        >
          <SlArrowRight />
        </button>
      </div>
      <hr />
      <div className="w-full h-[40px] mt-3 flex items-center justify-between">
        <div className="w-[20px] h-[20px]">
          <FaRegUser size={20} />
        </div>
        <p className="w-full ml-[10px]">마이 페이지</p>
        <button
          onClick={() => navigate("/user/edit-info")}
          className="text-sm float-right text-gray-300 hover:text-base"
        >
          <SlArrowRight />
        </button>
      </div>
      <div className="w-full h-[40px] my-2 flex items-center justify-between">
        <div className="w-[20px] h-[20px]">
          <LuGamepad2 size={20} />
        </div>
        <p className="w-full ml-[10px]">게임 메이트 등록</p>
        <button
          onClick={() => navigate("/user/gamemate")}
          className="text-sm float-right text-gray-300 hover:text-base"
        >
          <SlArrowRight />
        </button>
      </div>
      <div className="w-full h-[40px] my-2 flex items-center justify-between">
        <div className="w-[20px] h-[20px]">
          <PiCoins size={20} />
        </div>
        <p className="w-full ml-[10px]">나의 코인</p>
        <button
          onClick={() => navigate("/coin")}
          className="text-xs float-right text-gray-300"
        >
          <SlArrowRight />
        </button>
      </div>
      <div className="w-full h-[40px] mb-3 flex items-center justify-between">
        <div className="w-[20px] h-[20px]">
          <SlNotebook size={20} />
        </div>
        <p className="w-full ml-[10px]">의뢰</p>
        <button
          onClick={() => navigate("/user/orders")}
          className="text-sm float-right text-gray-300 hover:text-base"
        >
          <SlArrowRight />
        </button>
      </div>
      <hr />
      <div className="w-full h-[40px] my-3 flex items-center justify-between">
        <div className="w-[20px] h-[20px]">
          <TbLogout2 size={20} />
        </div>
        <p className="w-full ml-[10px] cursor-pointer">로그아웃</p>
      </div>
    </div>
  );
}
