import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'; // Autoplay 모듈 스타일
import { Autoplay, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import lol from '@/assets/imgs/banner1.png';
import overwatch from '@/assets/imgs/banner2.png';
import tft from '@/assets/imgs/banner3.png';
import bg from '@/assets/imgs/banner4.png';

export default function EventSlider() {
  const bannerImg = (img: number) => {
    switch (img) {
      case 1:
        return lol;
      case 2:
        return overwatch;
      case 3:
        return tft;
      case 4:
        return bg;
      default:
        break;
    }
  };

  return (
    <div className='relative'>
      <Swiper
        loop={true}
        slidesPerView={1}
        autoplay={{
          delay: 5000, // 2초마다 자동으로 슬라이드
          disableOnInteraction: false, // 유저 상호작용 후에도 자동 슬라이드 계속
        }}
        speed={1000} // 슬라이드 애니메이션 속도 2초로 설정
        modules={[Navigation, Autoplay]}
        className='mySwiper'
      >
        {new Array(4).fill(0).map((_, i) => (
          <SwiperSlide key={i + 1}>
            <Link
              to={`/event/${i + 1}`}
              style={{ backgroundImage: `url(${bannerImg(i + 1)})`, backgroundRepeat: 'no-repeat' }}
              className='relative flex h-[240px] w-[560px] items-center justify-center gap-32 rounded-3xl bg-pink-100 shadow-lg lg:h-[300px] lg:w-[740px] xl:h-[360px] xl:w-[950px]'
            ></Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
