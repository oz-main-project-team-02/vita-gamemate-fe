import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { GrPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';
import MateCard from '../Common/MateCard';
import { useQuery } from '@tanstack/react-query';
import { mock } from '@/api/mock';
import { User } from '@/config/types';
// import { GameMate, User } from '../../config/types';
// import { client } from '@/api/client';

type Props = {
  gameId: string;
};

export default function GameCategorySlider({ gameId }: Props) {
  // WARNING: 카테고리별 데이터 패칭이랑 같은 API를 사용하고 있음, delay(3000) 사용으로 로딩이 느린 현상. 버그X
  const { data: gameMates, isLoading } = useQuery<User[]>({
    queryKey: ['user', 'mate', gameId, 'main'],
    queryFn: async () => {
      const { data } = await mock.get(`/api/v1/users/${Number(gameId)}/mate?cursor=0`);
      return data;
    },
  });

  // FIXME: API 완료 시, 아래 코드로 변경

  // const { data: gameMates, isLoading } = useQuery<User[]>({
  //   queryKey: ['user', 'mate', gameId, 'main'],
  //   queryFn: async () => {
  //     try {
  //       const { data } = await client.get(`/api/v1/mates/${gameId}/?page=1`);
  //       return data;
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   },
  // });

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
