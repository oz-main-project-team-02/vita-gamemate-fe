import FilterList from "../components/EditInfoPage/FilterList";
import MyPageBar from "../components/EditInfoPage/MyPageBar";
import ProfileImg from "../components/EditInfoPage/ProfileImg";

export default function GameMatePage() {
  return (
    <div className="w-full h-[4105px]">
      {/* <NavBar /> */}
      <MyPageBar titleE = {"VITA GAMEMATE"} titleK = {"게임 메이트"} content = {"당신의 재능을 보여주세요!"} />
      <ProfileImg />
      <div className="w-[673px] h-[1866px] absolute top-[233px] flex justify-end bg-[#E2E2E2]"><FilterList /></div>
    </div>
  );
}
