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
  const gameName: string[] = ['리그오브레전드', '오버워치', '전략적 팀 전투', '배틀그라운드'];

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
            >
              <h1 className='absolute top-[253px] text-center text-[30px] font-extrabold text-gray-100 drop-shadow-md'>
                - {gameName[i]} -
              </h1>
              {/* <div>
                <p>함께하면 더욱 즐거운~</p>
                <h1 className='mb-5 text-2xl font-semibold lg:text-3xl xl:text-5xl'>VITA 셀럽 존</h1>
                <p>비타에서 게임 메이트와 즐겁게</p>
                <p>대화하며 {gameName[i]}를 즐겨보세요 !</p>
              </div>
              <div className='h-[120px] w-[120px] rounded-[50%] bg-white lg:h-[160px] lg:w-[160px] xl:h-[220px] xl:w-[220px]'></div> */}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
