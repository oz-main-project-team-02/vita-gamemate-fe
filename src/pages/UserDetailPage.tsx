import { AiOutlineMessage } from "react-icons/ai";
import { MdNotes } from "react-icons/md";
import { PiCrownSimpleFill } from "react-icons/pi";
import Gender from "../components/Common/Gender";
import OnlineFlag from "../components/Common/OnlineFlag";
import TitleIntro from "../components/Common/TitleIntro";
import CommonLayout from "../layouts/CommonLayout";
import UserRanking from "../components/UserDetailPage/UserRanking";
import VitaPrice from "../components/Common/VitaPrice";
import lol from "../assets/imgs/lol.png";
import ReviewList from "../components/UserDetailPage/ReviewList";
import { GameMate } from "../config/types";

export default function UserDetailPage() {
  const mate: GameMate = {
    id: 1,
    nickname: "Summoner123",
    email: "summoner123@example.com",
    gender: "male",
    description: "즐겁게 게임할 파트너를 찾고 있습니다.",
    birthday: "1995-08-15",
    profile_image: "https://picsum.photos/200/300?random=1",
    is_online: true,
    game_id: 1,
    level: "Diamond",
    price: 9999,
    average_rating: 4,
    amount: 500,
  };

  return (
    <CommonLayout>
      <div className="w-full h-[4105px]">
        <TitleIntro
          titleE={"Vita User"}
          titleK={"사용자 정보"}
          content={"비타 유저를 구경하세요!"}
        />
        <div className="w-full h-[1866px] pt-[93px] relative bg-gray-100">
          <div className="w-7/12 h-[127px] mx-auto mb-[48px] px-[37px] py-[27px] flex border rounded-3xl bg-[#FFFFFF]">
            <div className="w-[74px] h-[74px] border rounded-full bg-slate-50">
              <img
                className="w-[70px] h-[70px] p-2"
                src="/src/assets/imgs/user.png"
                alt="user"
              />
            </div>
            <div className="w-[900px] h-[75px] mx-6 flex flex-col">
              <p className="mb-[1px]">닉네임</p>
              <Gender gender="male" age={26} />
              <div className="w-[100px] mt-[-30px] ml-[45px] relative">
                <OnlineFlag />
              </div>
              <div className="mt-9 flex items-center">
                <div className="w-[31px] h-[19px] px-[10px] rounded-xl bg-gray-200 text-sm text-[#FFFFFF]">
                  id
                </div>
                <p className="ml-2 text-xs text-gray-200">아이디</p>
              </div>
            </div>
            <button className="w-[36px] h-[36px] my-4 bg-slate-200 rounded-full flex items-center justify-center">
              <AiOutlineMessage size={24} />
            </button>
          </div>

          <div className="w-7/12 h-[1170px] mx-auto flex flex-col flex-wrap justify-between content-between">
            <div className="w-1/3 h-[610px] border rounded-3xl bg-[#FFFFFF]">
              <img
                className="w-[400px] h-[400px]"
                src="/src/assets/imgs/user.png"
                alt="user"
              />
              <h1 className="px-5 pt-5 font-bold text-xl">소개</h1>
              <p className="px-5 py-3">소개말</p>
            </div>

            <div className="w-1/3 h-[512px] px-5 border rounded-3xl bg-gradient-to-b from-softYellow from-0% via-[#FFFFFF] via-20% to-[#FFFFFF] to-90%">
              <h1 className="pt-5 font-bold text-2xl">후원자 랭킹</h1>
              <p className="py-2 underline decoration-4 decoration-primary font-medium text-base">
                의뢰
              </p>
              <UserRanking />
              <UserRanking />
              <UserRanking />
              <UserRanking />
              <UserRanking />
              <UserRanking />
              <UserRanking />
            </div>

            <div className="w-3/5 h-[193px] p-8 flex border rounded-3xl bg-[#FFFFFF]">
              <div
                className="bg-gray-100 w-[130px] h-[130px] rounded-3xl overflow-hidden"
                style={{
                  backgroundImage: `url(${lol})`, // 배경 이미지 설정
                  backgroundSize: "130px 130px", // 이미지 크기를 322px x 331px으로 설정
                  backgroundRepeat: "no-repeat", // 배경 이미지가 반복되지 않도록 설정
                  backgroundPosition: "0px",
                }}
              ></div>
              <div className="w-3/5 h-[82px] px-4 py-1">
                <h1 className="pb-1 font-bold text-2xl">리그오브레전드</h1>
                <p className="pb-1 flex items-center">
                  <img
                    src="/src/assets/imgs/star.svg"
                    alt="리뷰 별점 아이콘"
                    className="w-[18px] h-[18px]"
                  />
                  &nbsp;5.00&nbsp;
                  <span className="text-gray-300 text-sm">
                    | 받은 의뢰수 10
                  </span>
                </p>
                <VitaPrice mate={mate} />
              </div>
              <button className="w-[120px] h-[50px] my-8 rounded-xl bg-gradient-to-r from-primary to-limeGreen font-bold text-[24px]">
                의뢰
              </button>
            </div>

            <div className="w-3/5 h-[560px] p-5 flex flex-col justify-between border rounded-3xl bg-[#FFFFFF]">
              <div className="mb-1 flex items-center">
                <p className="rounded bg-primary text-xl text-[#FFFFFF]">
                  <MdNotes />
                </p>
                <h1 className="px-2 font-bold text-2xl">게임 정보</h1>
              </div>
              <div className="w-full h-[120px] p-4 rounded-3xl bg-gray-100 text-sm">
                게임메이트등록 소개글
              </div>
              <div className="w-full h-[230px] rounded-3xl bg-gray-100">
                이미지 들어갈 자리(width 값 조정해도 됨)
              </div>
              <div className="w-full h-[60px] p-4 flex items-center rounded-3xl bg-gray-100 text-sm">
                <div className="w-6 h-6 mr-2 p-[4px] rounded-full bg-slate-200 text-base text-[#FFFFFF]">
                  <PiCrownSimpleFill />
                </div>
                <p className="text-[15px] text-gray-300">
                  <span className="text-gray-500">레벨:</span> 다이아몬드
                </p>
              </div>
            </div>

            <div className="w-3/5 h-[350px] p-5 border rounded-3xl bg-[#FFFFFF]">
              <div className="mb-2 flex items-center">
                <img
                  className="w-7"
                  src="/src/assets/imgs/star.svg"
                  alt="star"
                />
                <h1 className="px-2 font-bold text-2xl">
                  4.98 • 사용자 의견 (63)
                </h1>
              </div>
              <ReviewList />
              <ReviewList />
              <ReviewList />
              <div className="flex justify-center">
                <button className="w-[110px] h-[35px] rounded-xl bg-softYellow hover:font-semibold">
                  자세히 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
