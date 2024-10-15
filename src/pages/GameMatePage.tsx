import Footer from "../components/Common/Footer";
import Header from "../components/Common/Header";
import FilterList from "../components/EditInfoPage/FilterList";
import TitleIntro from "../components/Common/TitleIntro";
import ProfileImg from "../components/EditInfoPage/ProfileImg";
import CommonLayout from "../layouts/CommonLayout";

export default function GameMatePage() {
  return (
    <CommonLayout>
      <div className='w-full h-[4105px]'>
        {/* <NavBar /> */}
        <TitleIntro
          titleE={"VITA GAMEMATE"}
          titleK={"게임 메이트"}
          content={"당신의 재능을 보여주세요!"}
        />
        <div className='w-full h-[1866px] relative bg-gray-100'>
          <ProfileImg />
          <div className='w-[30%] h-[1866px] absolute flex justify-end bg-[#E2E2E2]'>
            <FilterList />
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
