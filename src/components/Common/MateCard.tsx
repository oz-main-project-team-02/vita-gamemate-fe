import { Link } from 'react-router-dom';
import OnlineFlag from './OnlineFlag';
import VitaPrice from './VitaPrice';
import { User } from '../../config/types';

export default function MateCard({ mate }: { mate: User }) {
  return (
    <Link to={`/user/${mate.id}`}>
      <div className='relative flex h-[288px] w-[206px] flex-col items-center justify-center overflow-hidden rounded-3xl leading-[1.3] shadow-lg'>
        {mate.is_online && <OnlineFlag />}
        <div className='h-[206px] w-[206px] overflow-hidden bg-blue-500'>
          <img
            src={mate.profile_image ? mate.profile_image : '/src/assets/imgs/user.png'}
            alt='사용자 이미지'
            className='w-[206px] overflow-hidden transition-transform duration-200 hover:scale-125'
          />
        </div>
        <div className='h-[82px] w-[206px] px-4 py-2'>
          <h2>{mate.nickname}</h2>
          <p className='flex items-center'>
            <img src='/src/assets/imgs/star.svg' alt='리뷰 별점 아이콘' className='h-[18px] w-[18px]' />
            &nbsp;{mate.average_rating}&nbsp;
            <span className='text-sm text-gray-300'>| 받은 의뢰수 {mate.amount}</span>
          </p>
          <VitaPrice mate={mate} />
        </div>
      </div>
    </Link>
  );
}
