import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import VitaPrice from "../Common/VitaPrice";

export default function GameMateSlider() {
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
        {new Array(4).fill(0).map((_, i) => (
          <SwiperSlide key={i}>
            <div className='relative bg-[#293883] w-full h-[206px] flex items-center rounded-3xl px-[10px] gap-4'>
              <div className='w-[30%] h-[186px] bg-blue-400 rounded-2xl'>
                <img src='/src/assets/imgs/user.png' alt='사용자 이미지' className='w-full h-full rounded-2xl' />
              </div>
              <div className='w-[70%] text-white'>
                <h2 className='text-2xl font-bold'>닉네임</h2>
                <p className='font-light text-gray-200 mb-4'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Nulla
                </p>
                <div className='flex gap-4'>
                  <img src='/src/assets/imgs/lol.png' alt='' className='w-[60px] h-[60px]' />
                  <div>
                    <h2 className='text-2xl font-bold'>리그 오브 레전드</h2>
                    <VitaPrice />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
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
