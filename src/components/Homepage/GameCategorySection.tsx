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
    <div className='flex h-[760px] items-center justify-center gap-36 bg-gray-100 px-[100px]'>
      <div className='flex flex-col'>
        <div className='mb-8'>
          <select defaultValue='default' onChange={handleGameChange} className='rounded-xl bg-gray-200 px-5 py-3'>
            <option value='default' disabled>
              게임을 선택해주세요!
            </option>
            <option value='1'>리그 오브 레전드</option>
            <option value='2'>전략적 팀 전투</option>
            <option value='3'>배틀그라운드</option>
            <option value='4'>오버워치</option>
          </select>
        </div>
        <div>
          <p className='text-base text-gray-300'>{getGame(Number(seletedGameId)).subTitle}</p>
          <h1 className='text-[48px]'>
            <span className='font-semibold'>{getGame(Number(seletedGameId)).title}</span>
          </h1>
          <p className='text-lg'>함께 게임할 준비가 된 메이트를 찾아봤어요,</p>
          <p className='text-lg'>바로 이분들이에요!</p>
        </div>
      </div>
      <div>
        <GameCategorySlider gameId={seletedGameId} />
      </div>
    </div>
  );
}
