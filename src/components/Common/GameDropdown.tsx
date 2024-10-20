import GameCard from './GameCard';

type HoverProps = {
  setGameHover: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function GameDropdown({ setGameHover }: HoverProps) {
  return (
    <div
      onMouseEnter={() => setGameHover(true)}
      onMouseLeave={() => setGameHover(false)}
      className='absolute left-[130px] top-[50px] z-20 h-[170px] w-[58%] min-w-[200px] justify-between py-4'
    >
      <div className='flex w-full flex-wrap rounded-3xl bg-gray-100 px-5 py-4'>
        <GameCard game={'lol'} />
        <GameCard game={'tft'} />
        <GameCard game={'overwatch'} />
        <GameCard game={'bg'} />
      </div>
    </div>
  );
}
