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
import { Link } from 'react-router-dom';

export default function GameMateSlider() {
  const { data, isLoading } = useQuery<UserResponse>({
    queryKey: ['user', 'mate', 'recommend'],
    queryFn: async () => {
      // FIXME: 실제 서비스에서는 delay 함수를 사용하지 않습니다.
      // FIXME: delay 함수 제거시 async await 구문 제거
      await delay();
      return await mateApi.fetchAllCategoryMates({ pageParam: 1 });
    },
  });
  console.log(data);

  return (
    <div className='relative mx-auto max-w-[200px] lg:max-w-[422px] xl:max-w-[600px]'>
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
              <Link
                to={`/user/${mate.id}`}
                className='relative flex h-full w-full flex-col gap-3 rounded-3xl bg-[#293883] p-3 lg:flex-row'
                style={{ boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.4)' }}
              >
                <div className='mx-auto h-[150px] w-[150px] overflow-hidden rounded-xl bg-blue-500 xl:h-[186px] xl:w-[186px]'>
                  <img
                    src={mate.profile_image ? mate.profile_image : '/src/assets/imgs/user.png'}
                    alt='사용자 이미지'
                    className='h-[150px] w-[150px] overflow-hidden transition-transform duration-200 hover:scale-125 xl:h-[186px] xl:w-[186px]'
                  />
                </div>
                <div className='flex flex-1 flex-col text-white lg:py-3'>
                  <h2 className='text-lg font-bold xl:text-2xl'>{mate.nickname}</h2>
                  <div className='mb-2 flex-1 whitespace-normal break-words font-light text-gray-200'>
                    {mate.description}
                  </div>
                  <div className='flex gap-4'>
                    <img
                      src={getGame(mate.mate_game_info?.[0].game_id)?.img}
                      alt='게임 이미지'
                      className='hidden h-[60px] w-[60px] rounded-xl bg-primary lg:block'
                    />
                    <div className='flex flex-col justify-center'>
                      <h2 className='text-base font-bold xl:text-2xl'>
                        {getGame(mate.mate_game_info?.[0].game_id)?.title}
                      </h2>
                      <VitaPrice mate={mate} />
                    </div>
                  </div>
                </div>
              </Link>
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
