import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { GrPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';
import VitaPrice from '../Common/VitaPrice';
import { useQuery } from '@tanstack/react-query';
import { getGame } from '../../config/const';
import { UserResponse } from '@/config/types';
import { mateApi } from '@/api';
import SkeletonTodayGameMate from '../skeleton/SkeletonTodayGameMate';
import { delay } from '@/utils/delay';

export default function GameMateSlider() {
  const { data, isLoading } = useQuery<UserResponse>({
    queryKey: ['user', 'mate', 'recommend'],
    queryFn: async () => {
      // FIXME: 실제 서비스에서는 delay 함수를 사용하지 않습니다.
      // FIXME: delay 함수 제거시 async await 구문 제거
      await delay(5000);
      return await mateApi.fetchAllCategoryMates({ pageParam: 1 });
    },
  });
  console.log(data);

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
        {isLoading ? (
          <SwiperSlide>
            <SkeletonTodayGameMate />
          </SwiperSlide>
        ) : (
          data?.results.map((mate) => (
            <SwiperSlide key={mate.id}>
              <div
                className='relative flex items-center gap-4 rounded-3xl bg-[#293883]'
                style={{ boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.4)' }}
              >
                <div className='m-3 h-[186px] w-[30%] rounded-2xl bg-blue-400'>
                  <img
                    src={mate.profile_image ? mate.profile_image : '/src/assets/imgs/user.png'}
                    alt='사용자 이미지'
                    className='h-full w-full rounded-2xl'
                  />
                </div>
                <div className='w-[70%] text-white'>
                  <h2 className='text-2xl font-bold'>{mate.nickname}</h2>
                  <p className='mb-2 font-light text-gray-200'>{mate.description}</p>
                  <div className='flex gap-4'>
                    <img
                      src={getGame(mate.mate_game_info?.[0].game_id)?.img}
                      alt='게임 이미지'
                      className='h-[60px] w-[60px]'
                    />
                    <div>
                      <h2 className='text-2xl font-bold'>{getGame(mate.mate_game_info?.[0].game_id)?.title}</h2>
                      <VitaPrice mate={mate} />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
        {/* 각 슬라이드 */}
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
