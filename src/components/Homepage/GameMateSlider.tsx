import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

export default function GameMateSlider() {
  return (
    <div className='mx-auto max-w-[672px] relative'>
      <Swiper
        loop={true}
        slidesPerView={1} // 한 화면에 3개의 슬라이드 표시
        spaceBetween={40}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        modules={[Navigation]}
        className='mySwiper'
      >
        {/* 각 슬라이드 */}
        {new Array(4).fill(0).map((_, i) => (
          <SwiperSlide key={i}>
            <div className='relative bg-[#293883] w-full h-[206px] flex flex-col items-center justify-center rounded-3xl'>
              <div className='relative z-10 text-white'>
                <h2 className='text-2xl font-bold'>리그 오브 레전드</h2>
                <p>League of Legends</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='absolute top-1/2 left-[-40px] custom-prev z-10'>
        <GrPrevious />
      </div>
      <div className='absolute top-1/2 right-[-40px] custom-next z-10'>
        <GrNext />
      </div>
    </div>
  );
}
