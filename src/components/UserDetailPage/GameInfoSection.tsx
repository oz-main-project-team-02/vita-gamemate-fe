import { MateGameInfo } from '@/config/types';
import { MdNotes } from 'react-icons/md';
import { PiCrownSimpleFill } from 'react-icons/pi';

type Props = {
  selectGame: MateGameInfo[];
};

export default function GameInfoSection({ selectGame }: Props) {
  return (
    <>
      {selectGame[0] !== undefined ? (
        <div className='my-[25px] flex h-[560px] w-full flex-col justify-between rounded-3xl border bg-[#FFFFFF] p-5'>
          <div className='mb-1 flex items-center'>
            <p className='rounded bg-primary text-xl text-[#FFFFFF]'>
              <MdNotes />
            </p>
            <h1 className='px-2 text-2xl font-bold'>게임 정보</h1>
          </div>

          <div className='h-[120px] w-full rounded-3xl bg-gray-100 p-4 text-sm'>{selectGame[0].description}</div>
          <div className='h-[230px] w-full rounded-3xl bg-gray-100'>
            <img className='h-[230px] w-full rounded-3xl object-cover' src={selectGame[0].image} alt='gameImg' />
          </div>
          <div className='flex h-[60px] w-full items-center rounded-3xl bg-gray-100 p-4 text-sm'>
            <div className='mr-2 h-6 w-6 rounded-full bg-slate-200 p-[4px] text-base text-[#FFFFFF]'>
              <PiCrownSimpleFill />
            </div>
            <p className='text-[15px] text-gray-300'>
              <span className='text-gray-500'>레벨: </span>
              {selectGame[0].level}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
