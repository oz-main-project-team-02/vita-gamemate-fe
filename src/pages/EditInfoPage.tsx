import FilterList from "../components/EditInfoPage/FilterList";
import TitleIntro from "../components/Common/TitleIntro";
import ProfileImg from "../components/EditInfoPage/ProfileImg";
import CommonLayout from "../layouts/CommonLayout";

export default function EditInfoPage() {
  return (
    <CommonLayout>
      <div className='w-full h-[4105px]'>
        {/* <NavBar /> */}
        <TitleIntro
          titleE={"MY PROFILE"}
          titleK={"프로필 편집"}
          content={"멋진 실력을 자랑해주세요!"}
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
