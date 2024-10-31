import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { GrPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';
import MateCard from '../Common/MateCard';
import { useQuery } from '@tanstack/react-query';
import { UserResponse } from '@/config/types';
import { mateApi } from '@/api';
import SkeletonMateCard from '../skeleton/SkeletonMateCard';

type Props = {
  gameId: string;
};

export default function GameCategorySlider({ gameId }: Props) {
  const { data, isLoading } = useQuery<UserResponse>({
    queryKey: ['user', 'mate', gameId, 'main'],
    queryFn: async () => {
      return await mateApi.fetchGameMateProfiles({ gameId, pageParam: 1 });
    },
  });
  console.log(data);

  return (
    <div className='relative mx-auto max-w-[200px] lg:max-w-[422px] xl:max-w-[672px]'>
      <Swiper
        slidesPerView={1}
        slidesPerGroup={1}
        breakpoints={{
          1024: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1280: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        navigation={{
          prevEl: '.gameCategory-prev',
          nextEl: '.gameCategory-next',
        }}
        modules={[Navigation]}
        className='mySwiper'
      >
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <SwiperSlide key={i}>
                <SkeletonMateCard />
              </SwiperSlide>
            ))
          : data?.results?.map((mate) => (
              <SwiperSlide key={mate.id}>
                <MateCard mate={mate} />
              </SwiperSlide>
            ))}
      </Swiper>
      <div className='gameCategory-prev absolute left-[-40px] top-1/2 z-10'>
        <GrPrevious />
      </div>
      <div className='gameCategory-next absolute right-[-40px] top-1/2 z-10'>
        <GrNext />
      </div>
    </div>
  );
}
