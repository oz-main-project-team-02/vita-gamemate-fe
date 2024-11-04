import { User } from '@/config/types';
import vitaCoin from '@/assets/imgs/vitaCoin.svg';

type Props = {
  mate: User;
  gameId: number | undefined;
};

export default function VitaPrice({ gameId, mate }: Props) {
  const game = mate.mate_game_info?.find((game) => game.game_id === gameId);

  return (
    <p className='flex items-center text-lg font-bold text-deepYellow'>
      <img src={vitaCoin} alt='비타 코인 아이콘' />
      &nbsp;{game?.request_price}
      <span className='text-sm font-light text-gray-300'>&nbsp;/&nbsp;판</span>
    </p>
  );
}
