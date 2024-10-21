import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { GrPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';
import MateCard from '../Common/MateCard';
import { useQuery } from '@tanstack/react-query';
import { GameMate } from '../../config/types';
import { mock } from '@/api/mock';

type Props = {
  gameId: string;
};

export default function GameCategorySlider({ gameId }: Props) {
  // WARNING: 카테고리별 데이터 패칭이랑 같은 API를 사용하고 있음, delay(3000) 사용으로 로딩이 느린 현상. 버그X
  const { data: gameMates, isLoading } = useQuery<GameMate[]>({
    queryKey: ['user', 'mate', gameId, 'main'],
    queryFn: async () => {
      const { data } = await mock.get(`/api/v1/users/${Number(gameId)}/mate?cursor=0`);
      return data;
    },
  });

  console.log('카테고리별 게임메이트', gameMates);

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
        {gameMates?.map((mate) => (
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
