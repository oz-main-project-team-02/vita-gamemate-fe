import { GAMES } from '@/config/const';
import GameCard from './GameCard';

type HoverProps = {
  setGameHover: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function GameDropdown({ setGameHover }: HoverProps) {
  return (
    <div
      onMouseEnter={() => setGameHover(true)}
      onMouseLeave={() => setGameHover(false)}
      className='absolute left-[130px] top-[40px] z-20 h-[180px] w-[58%] min-w-[500px] justify-between py-5'
    >
      <div className='flex w-auto rounded-3xl bg-gray-100 px-5 py-4'>
        {Object.entries(GAMES).map(([key, value]) => (
          <GameCard game={key} gameData={value} />
        ))}
      </div>
    </div>
  );
}
