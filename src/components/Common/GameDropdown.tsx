import { Games } from '@/config/const';
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
      <div className='flex w-full flex-wrap rounded-3xl bg-gray-100 px-5 py-4'>
        {Object.entries(Games).map(([key, value], i) => (
          <GameCard key={i} game={key} gameData={value} />
        ))}
      </div>
    </div>
  );
}
