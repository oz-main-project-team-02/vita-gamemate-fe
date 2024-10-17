import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { GAMES } from "../../config/const";

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
          prevEl: ".category-prev",
          nextEl: ".category-next",
        }}
        modules={[Navigation]}
        className='mySwiper'
      >
        {/* 각 슬라이드 */}
        {Object.values(GAMES).map((game) => (
          <SwiperSlide key={game.id}>
            <div
              className='relative bg-yellow-100 w-full h-[326px] flex flex-col items-center justify-center rounded-3xl overflow-hidden'
              style={{ backgroundImage: `url(${game.img})` }}
              onClick={() => handleCategoryClick(game.id)}
            >
              <div className='absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent'></div>
              <div className='relative z-10 text-white mt-[85%]'>
                <h2 className='text-2xl font-bold'>{game.title}</h2>
                <p>{game.subTitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='absolute top-1/2 left-[-40px] category-prev z-10'>
        <GrPrevious />
      </div>
      <div className='absolute top-1/2 right-[-40px] category-next z-10'>
        <GrNext />
      </div>
    </div>
  );
}
