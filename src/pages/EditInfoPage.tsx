import FilterList from "../components/EditInfoPage/FilterList";
import MyPageBar from "../components/EditInfoPage/MyPageBar";
import ProfileImg from "../components/EditInfoPage/ProfileImg";

export default function EditInfoPage() {
  return (
    <div className="w-full h-[4105px]">
      {/* <NavBar /> */}
      <MyPageBar titleE = {"MY PROFILE"} titleK = {"프로필 편집"} content = {"멋진 실력을 자랑해주세요!"} />
      <ProfileImg />
      <div className="w-[673px] h-[1866px] absolute top-[233px] flex justify-end bg-[#E2E2E2]"><FilterList /></div>
    </div>
  );
}
