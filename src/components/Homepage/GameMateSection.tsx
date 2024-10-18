import GameMateSlider from './GameMateSlider';

export default function GameMateSection() {
  return (
    <div className='flex h-[760px] items-center justify-center px-[100px]'>
      <div className='flex items-center gap-36'>
        <div>
          <p className='text-base text-gray-300'>TODAY GAMEMATE</p>
          <h1 className='text-[48px]'>
            오늘의 <span className='font-semibold'>게임 메이트</span>
          </h1>
          <p className='text-lg'>게임은 혼자보다 함께일 때 더 재미있어요!</p>
          <p className='text-lg'>당신의 게임 메이트를 찾아드립니다.</p>
        </div>
        <GameMateSlider />
      </div>
    </div>
  );
}
