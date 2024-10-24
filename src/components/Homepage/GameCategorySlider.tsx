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
import SkeletonMateCard from '../skeleton/skeletonMateCard';
import { delay } from '@/utils/delay';

type Props = {
  gameId: string;
};

export default function GameCategorySlider({ gameId }: Props) {
  const { data, isLoading } = useQuery<UserResponse>({
    queryKey: ['user', 'mate', gameId, 'main'],
    queryFn: async () => {
      // FIXME: 실제 서비스에서는 delay 함수를 사용하지 않습니다.
      // FIXME: delay 함수 제거시 async await 구문 제거
      await delay(5000);
      return await mateApi.fetchGameMateProfiles({ gameId, pageParam: 1 });
    },
  });
  console.log(data);

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

        {}
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
