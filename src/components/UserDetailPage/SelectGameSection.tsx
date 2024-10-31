import { Game, getGame } from '@/config/const';
import { MateGameInfo, User } from '@/config/types';
import { useSearchParams } from 'react-router-dom';

type Props = {
  mate: User;
  setSelectGame: React.Dispatch<React.SetStateAction<MateGameInfo | undefined>>;
  setIsReview: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SelectGameSection({ mate, setSelectGame, setIsReview }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const clickSelectGame = (game: Game) => {
    searchParams.set('game', `${game.id}`);
    setSearchParams(searchParams);
    mate.mate_game_info!.filter((games) => games.game_id === game.id && setSelectGame(games));
    setIsReview(false);
  };

  return (
    <div className='absolute right-[650px] top-[-0px] h-[193px] w-[350px] rounded-3xl border bg-[#FFFFFF]'>
      <h1 className='p-5 text-xl font-bold'>등록된 게임</h1>
      <div className='flex justify-around px-1'>
        {mate.mate_game_info?.map((games) => (
          <div
            onClick={() => clickSelectGame(getGame(games.game_id)!)}
            key={getGame(games.game_id)!.id}
            className='flex cursor-pointer flex-col items-center hover:scale-95'
          >
            <div className='h-[60px] w-[60px] rounded-full bg-[#f4f4f4]'>
              <img className='mx-auto my-1 w-[50px]' src={getGame(games.game_id)!.icon} alt='gameIcon' />
            </div>
            <p className='mt-2 text-xs font-medium'>{getGame(games.game_id)!.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
