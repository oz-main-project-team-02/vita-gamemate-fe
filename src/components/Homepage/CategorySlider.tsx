import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { GrPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';
import { Link, useNavigate } from 'react-router-dom';
import { Games } from '../../config/const';

export default function CategorySlider() {
  const navigate = useNavigate();

  const handleCategoryClick = (id: number) => {
    navigate(`/category/${id}`);
  };

  return (
    <div className='relative max-w-[200px] lg:max-w-[422px] xl:max-w-[672px]'>
      <Swiper
        loop={true}
        slidesPerView={1} // 한 화면에 3개의 슬라이드 표시
        slidesPerGroup={1} // 버튼 클릭 시 3개의 슬라이드 이동
        breakpoints={{
          1024: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1280: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        spaceBetween={20}
        navigation={{
          prevEl: '.category-prev',
          nextEl: '.category-next',
        }}
        modules={[Navigation]}
        className='mySwiper'
      >
        {/* 각 슬라이드 */}
        {Object.values(Games).map((game) => (
          <SwiperSlide key={game.id}>
            <Link
              to={`/category/${game.id}`}
              className='relative flex h-[286px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-primary lg:h-[306px] xl:h-[326px]'
              // style={{
              //   backgroundImage: `url(${game.img})`,
              //   boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.4)',
              //   backgroundRepeat: 'no-repeat',
              //   backgroundSize: 'cover',
              // }}
              onClick={() => handleCategoryClick(game.id)}
            >
              <img
                src={game.img}
                alt={game.title}
                className='cover absolute h-full w-full rounded-3xl' // Tailwind 유틸리티 클래스 사용
              />
              <div className='absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent'></div>
              <div className='relative z-10 mt-[85%] text-center text-white'>
                <h2 className='text-2xl font-bold'>{game.title}</h2>
                <p>{game.subTitle}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='category-prev absolute left-[-40px] top-1/2 z-10'>
        <GrPrevious />
      </div>
      <div className='category-next absolute right-[-40px] top-1/2 z-10'>
        <GrNext />
      </div>
    </div>
  );
}
