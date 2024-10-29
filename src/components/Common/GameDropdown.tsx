import { Games } from '@/config/const';
import GameCard from './GameCard';

type HoverProps = {
  setGameHover: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function GameDropdown({ setGameHover }: HoverProps) {
  return (
    <div
      className='absolute left-[100px] top-14 z-30 rounded-2xl bg-gray-100 p-2 shadow-2xl lg:top-16'
      onMouseEnter={() => setGameHover(true)}
      onMouseLeave={() => setGameHover(false)}
    >
      <div className='z-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {Object.entries(Games).map(([key, value], i) => (
          <GameCard key={i} game={key} gameData={value} />
        ))}
      </div>
    </div>
  );
}
