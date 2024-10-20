import CategorySlider from './CategorySlider';

export default function CategorySection() {
  return (
    <div className='flex h-[760px] items-center justify-center gap-10 bg-gray-100 px-[100px]'>
      <div className='flex items-center gap-36'>
        <div>
          <p className='text-base text-gray-300'>RECOMMEND CATEGORY</p>
          <h1 className='text-[48px]'>
            추천 <span className='font-semibold'>카테고리</span>
          </h1>
          <p className='text-lg'>끝없는 도전과 재미를 제공하는 다양한 게임들!</p>
          <p className='text-lg'>당신의 게임 메이트도 함께합니다.</p>
        </div>
        <CategorySlider />
      </div>
    </div>
  );
}
