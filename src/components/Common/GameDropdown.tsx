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
      className='absolute left-[130px] top-[40px] z-30 min-w-[500px] py-5'
    >
      <div className='z-20 grid grid-cols-4 rounded-3xl bg-gray-100 px-5 py-4'>
        {Object.entries(Games).map(([key, value], i) => (
          <GameCard key={i} game={key} gameData={value} />
        ))}
      </div>
    </div>
  );
}
