import FilterList from "../components/EditInfoPage/FilterList";
import TitleIntro from "../components/Common/TitleIntro";
import ProfileImg from "../components/EditInfoPage/ProfileImg";
import CommonLayout from "../layouts/CommonLayout";
import CoinBox from "../components/CoinPage/CoinBox";

export default function CoinPage() {
  return (
    <CommonLayout>
      <div className='w-full h-[4105px]'>
        <TitleIntro
          titleE={"MY WALLET"}
          titleK={"나의 코인"}
          content={"소중한 시간을 비타와 함께하세요!"}
        />
        <div className='w-full h-[1866px] relative bg-gray-100'>
          <ProfileImg />
          <p className="absolute top-[30px] left-[57%] font-bold text-2xl text-gray-500">닉네임</p>
          <p className="absolute top-[75px] left-[57%] font-bold text-xl text-[#898989]">아이디</p>
          <div className="w-[50%] h-[704px] absolute top-[260px] left-[40.5%]">
            <button className="w-full h-[130px] mb-[55px] rounded-xl bg-[#FF7A7A] text-5xl text-[#FFFFFF] cursor-pointer">첫 결제 혜택</button>

            <p className="pb-[5px] font-bold text-2xl text-gray-500">닉네임</p>
            <div className="w-full h-[480px] px-[65px] py-[58px] grid grid-cols-4 gap-[39px] border rounded-xl border-gray-200 bg-[#FFFFFF]">
              <CoinBox />
              <CoinBox />
              <CoinBox />
              <CoinBox />
              <CoinBox />
              <CoinBox />
              <CoinBox />
              <CoinBox />
            </div>
          </div>
          <div className='w-[30%] h-[1866px] absolute flex justify-end bg-[#E2E2E2]'>
            <FilterList />
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
