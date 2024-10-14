import Footer from "../components/Common/Footer";
import Header from "../components/Common/Header";
import FilterList from "../components/EditInfoPage/FilterList";
import ProfileImg from "../components/EditInfoPage/ProfileImg";
import TitleIntro from "../components/Common/TitleIntro";

export default function CoinPage() {
  return (
    <>
      <Header />
      <div className="w-full h-[4105px]">
        <TitleIntro titleE = {"MY WALLET"} titleK = {"나의 코인"} content = {"소중한 시간을 비타와 함께하세요!"} />
        <ProfileImg />
        <div className="w-[500px] h-[1866px] absolute top-[295px] flex justify-end bg-[#E2E2E2]"><FilterList /></div>
      </div>
      <Footer />
    </>
  );
}
