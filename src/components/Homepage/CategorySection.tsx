import CategorySlider from './CategorySlider';

export default function CategorySection() {
  return (
    <div className='flex h-[460px] items-center justify-center gap-10 bg-gray-100 px-[100px] lg:h-[610px] xl:h-[760px]'>
      <div className='flex items-center gap-24 xl:gap-36'>
        <div>
          <p className='text-sm text-gray-300 lg:text-base xl:text-lg'>RECOMMEND CATEGORY</p>
          <h1 className='text-[24px] lg:text-[36px] xl:text-[44px]'>
            추천 <span className='font-semibold'>카테고리</span>
          </h1>
          <p className='text-sm lg:text-base xl:text-lg'>끝없는 도전과 재미를 제공하는 다양한 게임들!</p>
          <p className='text-sm lg:text-base xl:text-lg'>당신의 게임 메이트도 함께합니다.</p>
        </div>
        <CategorySlider />
      </div>
    </div>
  );
}
