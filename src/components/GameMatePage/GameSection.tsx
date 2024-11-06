import { Games } from '@/config/const';
import { useUserStore } from '@/config/store';
import { MateRegister } from '@/config/types';

type Props = {
  isDropdownOpen: { game: boolean; level: boolean };
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<{ game: boolean; level: boolean }>>;
  game_id: string | null;
  setFormData: React.Dispatch<React.SetStateAction<MateRegister>>;
};

export default function GameSection({ isDropdownOpen, setIsDropdownOpen, game_id, setFormData }: Props) {
  // fix: possibleGmaeIds = 선택한 게임 필터링 후 반환되는 값
  const user = useUserStore((state) => state.user);

  const possibleGameIds = Object.values(Games).filter((game) => {
    return !user.mate_game_info?.some((info) => info.game_id === game.id);
  });

  return (
    <>
      <button
        onClick={() => setIsDropdownOpen((prev) => ({ ...prev, game: !isDropdownOpen.game }))}
        className='relative flex h-[50px] items-center justify-between rounded-xl bg-white p-4 text-gray-400 outline outline-gray-200'
      >
        <span>{game_id ? game_id : '게임을 선택하세요.'}</span>
        <span className='text-xl'>&gt;</span>
      </button>
      {isDropdownOpen.game && (
        <div className='mt-4 rounded-xl bg-white p-4 outline outline-gray-200'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {possibleGameIds &&
              possibleGameIds.map((game, i) => (
                <div
                  key={i}
                  onClick={() => setFormData((prev) => ({ ...prev, game_id: game.title }))}
                  className={`flex flex-1 flex-col items-center rounded-xl py-2 hover:scale-110 hover:bg-[#FFD80077] ${game_id === game.title ? 'bg-primary' : null}`}
                >
                  <div className='rounded-full bg-gray-200 p-4'>
                    <img
                      src={game.icon}
                      alt={`${game.title} 로고`}
                      className='h-8 min-h-8 w-8 min-w-8 lg:h-12 lg:w-12 xl:h-16 xl:w-16'
                    />
                  </div>
                  <span
                    className={`// mt-2 text-center text-xs lg:text-sm xl:text-base ${game_id === game.title ? 'font-semibold' : null} `}
                  >
                    {game.title}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
