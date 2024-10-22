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

type Props = {
  gameId: string;
};

export default function GameCategorySlider({ gameId }: Props) {
  const { data, isLoading } = useQuery<UserResponse>({
    queryKey: ['user', 'mate', gameId, 'main'],
    queryFn: () => mateApi.fetchGameMateProfiles({ gameId, pageParam: 1 }),
  });
  console.log(data);

  if (isLoading) return <div></div>;

  return (
    <div className='relative mx-auto max-w-[672px]'>
      <Swiper
        slidesPerView={3} // 한 화면에 3개의 슬라이드 표시
        slidesPerGroup={3} // 버튼 클릭 시 3개의 슬라이드 이동
        navigation={{
          prevEl: '.gameCategory-prev',
          nextEl: '.gameCategory-next',
        }}
        modules={[Navigation]}
        className='mySwiper'
      >
        {/* 각 슬라이드 */}
        {data?.results?.map((mate) => (
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
