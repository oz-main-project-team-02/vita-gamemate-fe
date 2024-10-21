import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { GrPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { Games } from '../../config/const';

export default function CategorySlider() {
  const navigate = useNavigate();

  const handleCategoryClick = (id: number) => {
    navigate(`/category/${id}`);
  };

  return (
    <div className='relative max-w-[672px]'>
      <Swiper
        loop={true}
        slidesPerView={3} // 한 화면에 3개의 슬라이드 표시
        slidesPerGroup={3} // 버튼 클릭 시 3개의 슬라이드 이동
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
            <div
              className='relative flex h-[326px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-yellow-100'
              style={{ backgroundImage: `url(${game.img})` }}
              onClick={() => handleCategoryClick(game.id)}
            >
              <div className='absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent'></div>
              <div className='relative z-10 mt-[85%] text-white'>
                <h2 className='text-2xl font-bold'>{game.title}</h2>
                <p>{game.subTitle}</p>
              </div>
            </div>
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
