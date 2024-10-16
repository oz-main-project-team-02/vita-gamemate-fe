import FilterList from "../components/EditInfoPage/FilterList";
import TitleIntro from "../components/Common/TitleIntro";
import ProfileImg from "../components/EditInfoPage/ProfileImg";
import CommonLayout from "../layouts/CommonLayout";
import Request from "../components/OrderPage/Request";
import Response from "../components/OrderPage/Response";
import { useState } from "react";

export default function OrdersPage() {
  const [selectButton, setSelectButton] = useState("request");

  return (
    <CommonLayout>
      <div className='w-full h-[4105px]'>
        {/* <NavBar /> */}
        <TitleIntro titleE={"MY ORDER"} titleK={"나의 의뢰"} content={"즐거운 매칭을 비타와 함께하세요!"} />
        <div className='w-full h-[1866px] relative bg-gray-100'>
          <ProfileImg />
          <p className='absolute top-[30px] left-[57%] font-bold text-2xl text-gray-500'>닉네임</p>
          <p className='absolute top-[75px] left-[57%] font-bold text-xl text-[#898989]'>아이디</p>
          <div className='w-[50%] h-[1500px] absolute top-[260px] left-[40.5%]'>
            <p className='pb-[26px] font-bold text-2xl text-gray-500'>닉네임</p>
            <button
              onClick={() => setSelectButton(() => "request")}
              className="w-[149px] h-[50px] ${selectButton === 'request' ? bg-primary : hover:bg-primary} font-extrabold text-2xl"
            >
              나의 주문
            </button>
            <button
              onClick={() => setSelectButton(() => "response")}
              className="w-[214px] h-[50px] ${selectButton === 'response' ? bg-primary : hover:bg-primary} font-extrabold text-2xl"
            >
              주문을 받았습니다
            </button>
            <hr className='h-[1px] border-[1px]' />
            <Request />
            <Response />
          </div>
          <div className='w-[30%] h-[1866px] absolute flex justify-end bg-[#E2E2E2]'>
            <FilterList />
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
