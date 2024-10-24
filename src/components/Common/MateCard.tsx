import { Link } from 'react-router-dom';
import OnlineFlag from './OnlineFlag';
import VitaPrice from './VitaPrice';
import { User } from '../../config/types';
import { useEffect, useState } from 'react';

const accessToken = localStorage.getItem('accessToken');
const socket: WebSocket = new WebSocket(`ws://resdineconsulting.com/ws/status/?token=${accessToken}`);

export default function MateCard({ mate }: { mate: User }) {
  const [isOnline, setIsOnline] = useState<boolean>(false);

  useEffect(() => {
    socket.onopen = () => {
      // 특정 유저의 온라인 상태를 서버에 요청
      socket.send(JSON.stringify({ type: 'check_status', userId: mate.id }));
    };

    // 서버로부터 해당 유저의 상태를 수신
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'user_status' && data.userId === mate.id) {
        setIsOnline(data.isOnline); // 해당 유저가 온라인인지 상태 설정
        console.log(isOnline);
      }
    };

    return () => {
      socket.close();
    };
  }, [mate.id, isOnline]);

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
