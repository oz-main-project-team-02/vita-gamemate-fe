import Footer from "../components/Common/Footer";
import Header from "../components/Common/Header";
import FilterList from "../components/EditInfoPage/FilterList";
import TitleIntro from "../components/Common/TitleIntro";
import ProfileImg from "../components/EditInfoPage/ProfileImg";
import CommonLayout from "../layouts/CommonLayout";

export default function OrdersPage() {
  return (
    <CommonLayout>
      <div className='w-full h-[4105px]'>
        {/* <NavBar /> */}
        <TitleIntro
          titleE={"MY ORDER"}
          titleK={"나의 의뢰"}
          content={"즐거운 매칭을 비타와 함께하세요!"}
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
