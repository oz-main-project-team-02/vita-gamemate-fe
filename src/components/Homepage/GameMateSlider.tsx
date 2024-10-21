import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { GrPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';
import VitaPrice from '../Common/VitaPrice';
import { useQuery } from '@tanstack/react-query';
import { GameMate } from '../../config/types';
import { getGame } from '../../config/const';
import { mock } from '@/api/mock';

export default function GameMateSlider() {
  const { data: recommendMates } = useQuery<GameMate[]>({
    queryKey: ['user', 'recommend'],
    queryFn: async () => {
      const response = await mock.get(`/api/v1/users/todayrecommend`);
      return response.data;
    },
  });

  return (
    <div className='relative mx-auto max-w-[672px]'>
      <Swiper
        slidesPerView={1} // 한 화면에 3개의 슬라이드 표시
        spaceBetween={40}
        navigation={{
          prevEl: '.gameMate-prev',
          nextEl: '.gameMate-next',
        }}
        modules={[Navigation]}
        className='mySwiper'
      >
        {/* 각 슬라이드 */}
        {recommendMates?.map((mate) => {
          return (
            <SwiperSlide key={mate.id}>
              <div className='relative flex h-[206px] w-full items-center gap-4 rounded-3xl bg-[#293883] px-[10px]'>
                <div className='h-[186px] w-[30%] rounded-2xl bg-blue-400'>
                  <img
                    src={mate.profile_image ? mate.profile_image : '/src/assets/imgs/user.png'}
                    alt='사용자 이미지'
                    className='h-full w-full rounded-2xl'
                  />
                </div>
                <div className='w-[70%] text-white'>
                  <h2 className='text-2xl font-bold'>{mate.nickname}</h2>
                  <p className='mb-4 font-light text-gray-200'>{mate.description}</p>
                  <div className='flex gap-4'>
                    <img src={getGame(mate.game_id)?.img} alt='' className='h-[60px] w-[60px]' />
                    <div>
                      <h2 className='text-2xl font-bold'>{getGame(mate.game_id)?.title}</h2>
                      <VitaPrice mate={mate} />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className='gameMate-prev absolute left-[-40px] top-1/2 z-10'>
        <GrPrevious />
      </div>
      <div className='gameMate-next absolute right-[-40px] top-1/2 z-10'>
        <GrNext />
      </div>
    </div>
  );
}
