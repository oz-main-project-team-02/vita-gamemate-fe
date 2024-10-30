import { getGame } from '@/config/const';
import { MateGameInfo, User } from '@/config/types';

type Props = {
  mate: User;
  setSelectGame: React.Dispatch<React.SetStateAction<MateGameInfo[]>>;
};

export default function SelectGameSection({ mate, setSelectGame }: Props) {
  return (
    <div className='absolute right-[650px] top-[625px] h-[155px] w-[350px] rounded-3xl border bg-[#FFFFFF]'>
      <h1 className='px-5 pt-4 text-xl font-bold'>등록된 게임</h1>
      <div className='my-2 flex justify-around'>
        {mate.mate_game_info
          ?.map((games) => getGame(games.game_id)!)
          .map((game) => (
            <div
              onClick={() => setSelectGame(mate.mate_game_info!.filter((games) => games.game_id === game.id))}
              key={game.id}
              className='flex cursor-pointer flex-col items-center hover:scale-95'
            >
              <div className='h-[60px] w-[60px] rounded-full bg-[#f4f4f4]'>
                <img className='mx-auto my-1 w-[50px]' src={game.icon} alt='gameIcon' />
              </div>
              <p className='mt-1 text-xs font-medium'>{game.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
