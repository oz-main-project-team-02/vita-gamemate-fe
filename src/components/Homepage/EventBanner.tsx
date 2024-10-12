// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // Autoplay 모듈 스타일
import "../../global.css";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

export default function EventBanner() {
  return (
    <div>
      <Swiper
        loop={true}
        slidesPerView={1}
        navigation={true}
        autoplay={{
          delay: 5000, // 2초마다 자동으로 슬라이드
          disableOnInteraction: false, // 유저 상호작용 후에도 자동 슬라이드 계속
        }}
        speed={1000} // 슬라이드 애니메이션 속도 2초로 설정
        modules={[Navigation, Autoplay]}
        className='mySwiper'
      >
        {new Array(4).fill(0).map((_, i) => (
          <SwiperSlide key={i}>
            <div className='w-[950px] h-[360px] flex items-center justify-center gap-32 bg-pink-100 rounded-3xl'>
              <div>
                <p>함께하면 더욱 즐거운~</p>
                <h1 className='text-5xl mb-5'>VITA 셀럽 존</h1>
                <p>비타에서 게임 메이트와 즐겁게</p>
                <p>대화하며 롤 듀오를 즐겨보세요 !</p>
              </div>
              <div className='w-[220px] h-[220px] rounded-[50%] bg-white'></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
