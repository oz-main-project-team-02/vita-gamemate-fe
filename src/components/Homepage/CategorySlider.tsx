import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import lol from "../../assets/imgs/lol.png";

export default function CategorySlider() {
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
            <div
              className='relative bg-yellow-200 w-[206px] h-[360px] flex flex-col items-center justify-center bg-transparent rounded-3xl overflow-x-hidden'
              style={{
                backgroundImage: `url(${lol})`, // 배경 이미지 설정
                backgroundSize: "360px 366px", // 이미지 크기를 322px x 331px으로 설정
                backgroundRepeat: "no-repeat", // 배경 이미지가 반복되지 않도록 설정
                backgroundPosition: "-50px",
              }}
            >
              <div className='absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent'></div>

              <div className='relative z-10 text-white mt-[85%]'>
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
