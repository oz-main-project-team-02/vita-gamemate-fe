import CategorySlider from "../components/Homepage/CategorySlider";
import EventSlider from "../components/Homepage/EventSlider";
import CommonLayout from "../layouts/CommonLayout";

export default function HomePage() {
  return (
    <CommonLayout>
      <div className='relative'>
        <div className='h-[440px]'>
          <div className='absolute top-[150px] left-0 right-0'>
            <EventSlider />
          </div>
        </div>
        <div className='flex items-center justify-center gap-10 h-[760px] bg-gray-100'>
          <div className='flex items-center gap-36'>
            <div>
              <p className='text-gray-300 text-base'>RECOMMEND CATEGORY</p>
              <h1 className='text-[48px]'>
                추천 <span className='font-semibold'>카테고리</span>
              </h1>
              <p className='text-lg'>
                끝없는 도전과 재미를 제공하는 다양한 게임들!
              </p>
              <p className='text-lg'>당신의 게임 메이트도 함께합니다.</p>
            </div>
            <CategorySlider />
          </div>
        </div>
        <div className='h-[760px]'></div>
        <div className='h-[760px] bg-gray-100'></div>
      </div>
    </CommonLayout>
  );
}
