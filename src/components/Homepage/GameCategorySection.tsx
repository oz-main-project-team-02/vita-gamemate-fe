import { getGame } from '@/config/const';
import GameCategorySlider from './GameCategorySlider';
import { ChangeEventHandler, useState } from 'react';

export default function GameCategorySection() {
  const [seletedGameId, setSelectedGameId] = useState<string>('1');

  const handleGameChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelectedGameId(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className='flex h-[460px] items-center justify-center gap-24 bg-gray-100 px-[100px] lg:h-[610px] xl:h-[760px] xl:gap-36'>
      <div className='flex flex-col'>
        <div className='mb-8'>
          <select defaultValue='default' onChange={handleGameChange} className='rounded-xl bg-gray-200 px-5 py-3'>
            <option value='default' disabled>
              게임을 선택해주세요!
            </option>
            <option value='1'>리그 오브 레전드</option>
            <option value='2'>오버워치</option>
            <option value='3'>전략적 팀 전투</option>
            <option value='4'>배틀그라운드</option>
          </select>
        </div>
        <div>
          <p className='text-sm text-gray-300 lg:text-base xl:text-lg'>{getGame(Number(seletedGameId))?.subTitle}</p>
          <h1 className='text-[24px] lg:text-[36px] xl:text-[44px]'>
            <span className='font-semibold'>{getGame(Number(seletedGameId))?.title}</span>
          </h1>
          <p className='text-sm lg:text-base xl:text-lg'>함께 게임할 준비가 된 메이트를 찾아봤어요,</p>
          <p className='text-sm lg:text-base xl:text-lg'>바로 이분들이에요!</p>
        </div>
      </div>
      <div>
        <GameCategorySlider gameId={seletedGameId} />
      </div>
    </div>
  );
}
