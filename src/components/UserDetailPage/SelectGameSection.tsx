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
    <div className='absolute top-[-220px] h-[193px] w-[350px] rounded-3xl border bg-[#FFFFFF] sm:w-[500px] md:left-[-230px] md:right-[500px] md:top-[0px] md:w-[200px] lg:left-[-330px] lg:right-[600px] lg:w-[300px] xl:left-[-380px] xl:right-[650px] xl:w-[350px]'>
      <h1 className='p-5 text-xl font-bold md:hidden lg:block'>등록된 게임</h1>
      <div className='flex justify-around px-1 md:mt-3 md:flex-wrap lg:mt-0 lg:flex-nowrap'>
        {mate.mate_game_info
          ?.slice()
          .sort((a, b) => a.game_id - b.game_id)
          .map((games) => (
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
