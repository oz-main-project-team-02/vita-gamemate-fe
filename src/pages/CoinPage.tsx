import FilterList from "../components/EditInfoPage/FilterList";
import MyPageBar from "../components/EditInfoPage/MyPageBar";
import ProfileImg from "../components/EditInfoPage/ProfileImg";

export default function CoinPage() {
  return (
    <div className="w-full h-[4105px]">
      {/* <NavBar /> */}
      <MyPageBar titleE = {"MY WALLET"} titleK = {"나의 코인"} content = {"소중한 시간을 비타와 함께하세요!"} />
      <ProfileImg />
      <div className="w-[673px] h-[1866px] absolute top-[233px] flex justify-end bg-[#E2E2E2]"><FilterList /></div>
    </div>
  );
}
