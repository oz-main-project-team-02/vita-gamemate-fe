import GameMateSlider from './GameMateSlider';

export default function GameMateSection() {
  return (
    <div className='flex h-[460px] items-center justify-center px-[100px] lg:h-[610px] xl:h-[760px]'>
      <div className='flex items-center gap-24 xl:gap-36'>
        {/* title, description */}
        <div>
          <p className='text-sm text-gray-300 lg:text-base xl:text-lg'>TODAY GAMEMATE</p>
          <h1 className='text-[24px] lg:text-[36px] xl:text-[44px]'>
            오늘의 <span className='font-semibold'>게임 메이트</span>
          </h1>
          <p className='text-sm lg:text-base xl:text-lg'>게임은 혼자보다 함께일 때 더 재미있어요!</p>
          <p className='text-sm lg:text-base xl:text-lg'>당신의 게임 메이트를 찾아드립니다.</p>
        </div>
        <GameMateSlider />
      </div>
    </div>
  );
}
