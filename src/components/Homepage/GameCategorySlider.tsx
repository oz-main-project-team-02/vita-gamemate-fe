import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

export default function GameCategorySlider() {
  return (
    <div className='mx-auto max-w-[672px] relative'>
      <Swiper
        loop={true}
        slidesPerView={3} // 한 화면에 3개의 슬라이드 표시
        slidesPerGroup={3} // 버튼 클릭 시 3개의 슬라이드 이동
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        modules={[Navigation]}
        className='mySwiper'
      >
        {/* 각 슬라이드 */}
        {new Array(12).fill(0).map((_, i) => (
          <SwiperSlide key={i}>
            <div className='relative flex flex-col items-center justify-center w-full h-[326px] rounded-3xl shadow-lg'>
              <div className='relative '>1</div>
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
