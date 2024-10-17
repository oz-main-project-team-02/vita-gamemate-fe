import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import VitaPrice from "../Common/VitaPrice";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GameMate } from "../../config/types";
import { getGame } from "../../config/const";

export default function GameMateSlider() {
  const { data: recommendMates } = useQuery<GameMate[]>({
    queryKey: ["user", "recommend"],
    queryFn: async () => {
      const response = await axios.get(`/api/v1/users/todayrecommend`);
      return response.data;
    },
  });

  return (
    <div className='mx-auto max-w-[672px] relative'>
      <Swiper
        loop={true}
        slidesPerView={1} // 한 화면에 3개의 슬라이드 표시
        spaceBetween={40}
        navigation={{
          prevEl: ".gameMate-prev",
          nextEl: ".gameMate-next",
        }}
        modules={[Navigation]}
        className='mySwiper'
      >
        {/* 각 슬라이드 */}
        {recommendMates?.map((mate) => {
          return (
            <SwiperSlide key={mate.id}>
              <div className='relative bg-[#293883] w-full h-[206px] flex items-center rounded-3xl px-[10px] gap-4'>
                <div className='w-[30%] h-[186px] bg-blue-400 rounded-2xl'>
                  <img
                    src={mate.profile_image ? mate.profile_image : "/src/assets/imgs/user.png"}
                    alt='사용자 이미지'
                    className='w-full h-full rounded-2xl'
                  />
                </div>
                <div className='w-[70%] text-white'>
                  <h2 className='text-2xl font-bold'>{mate.nickname}</h2>
                  <p className='font-light text-gray-200 mb-4'>{mate.description}</p>
                  <div className='flex gap-4'>
                    <img src={getGame(mate.game_id)?.img} alt='' className='w-[60px] h-[60px]' />
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
      <div className='absolute top-1/2 left-[-40px] gameMate-prev z-10'>
        <GrPrevious />
      </div>
      <div className='absolute top-1/2 right-[-40px] gameMate-next z-10'>
        <GrNext />
      </div>
    </div>
  );
}
