import Footer from "../components/Common/Footer";
import Header from "../components/Common/Header";
import FilterList from "../components/EditInfoPage/FilterList";
import ProfileImg from "../components/EditInfoPage/ProfileImg";
import TitleIntro from "../components/Common/TitleIntro";

export default function GameMatePage() {
  return (
    <>
      <Header />
      <div className="w-full h-[4105px]">
        <TitleIntro titleE = {"VITA GAMEMATE"} titleK = {"게임 메이트"} content = {"당신의 재능을 보여주세요!"} />
        <ProfileImg />
        <div className="w-[500px] h-[1866px] absolute top-[295px] flex justify-end bg-[#E2E2E2]"><FilterList /></div>
      </div>
      <Footer />
    </>
  );
}
