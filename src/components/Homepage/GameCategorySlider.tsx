import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import MateCard from "../Common/MateCard";
import { useQuery } from "@tanstack/react-query";
import { GameMate } from "../../config/types";
import axios from "axios";

type Props = {
  gameId: string;
};

export default function GameCategorySlider({ gameId }: Props) {
  const { data, isLoading } = useQuery<GameMate[]>({
    queryKey: ["user", "mate", gameId], // 쿼리 키
    queryFn: async () => {
      const response = await axios.get(`/api/v1/mates/${gameId}`);
      return response.data;
    },
  });

  console.log(data);

  if (isLoading) return <div></div>;

  return (
    <div className='mx-auto max-w-[672px] relative'>
      <Swiper
        loop={true}
        slidesPerView={3} // 한 화면에 3개의 슬라이드 표시
        slidesPerGroup={3} // 버튼 클릭 시 3개의 슬라이드 이동
        navigation={{
          prevEl: ".gameCategory-prev",
          nextEl: ".gameCategory-next",
        }}
        modules={[Navigation]}
        className='mySwiper'
      >
        {/* 각 슬라이드 */}
        {data?.map((mate) => (
          <SwiperSlide key={mate.id}>
            <MateCard mate={mate} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='absolute top-1/2 left-[-40px] gameCategory-prev z-10'>
        <GrPrevious />
      </div>
      <div className='absolute top-1/2 right-[-40px] gameCategory-next z-10'>
        <GrNext />
      </div>
    </div>
  );
}
