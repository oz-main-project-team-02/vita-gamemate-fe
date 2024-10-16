import { Link } from "react-router-dom";
import OnlineFlag from "./OnlineFlag";
import VitaPrice from "./VitaPrice";
import { GameMate } from "../../config/types";

export default function MateCard({ mate }: { mate: GameMate }) {
  return (
    <Link to={`/user/${mate.id}`}>
      <div className='relative flex flex-col items-center justify-center w-[206px] h-[288px] rounded-3xl shadow-lg overflow-hidden leading-[1.3]'>
        {mate.is_onlien && <OnlineFlag />}
        <div className='w-[206px] h-[206px] bg-blue-500 overflow-hidden'>
          <img
            src={mate.profile_image ? mate.profile_image : "/src/assets/imgs/user.png"}
            alt='사용자 이미지'
            className='w-[206px] hover:scale-125 overflow-hidden transition-transform duration-200'
          />
        </div>
        <div className='w-[206px] h-[82px] px-4 py-2'>
          <h2>{mate.nickname}</h2>
          <p className='flex items-center'>
            <img src='/src/assets/imgs/star.svg' alt='리뷰 별점 아이콘' className='w-[18px] h-[18px]' />
            &nbsp;{mate.average_rating}&nbsp;
            <span className='text-gray-300 text-sm'>| 받은 의뢰수 {mate.amount}</span>
          </p>
          <VitaPrice mate={mate} />
        </div>
      </div>
    </Link>
  );
}
