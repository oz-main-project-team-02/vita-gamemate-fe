import { User } from '@/config/types';

type Props = {
  mate: User;
};

export default function VitaPrice({ mate }: Props) {
  return (
    <p className='flex items-center text-lg font-bold text-deepYellow'>
      <img src='/src/assets/imgs/vitaCoin.svg' alt='비타 코인 아이콘' />
      &nbsp;{mate.mate_game_info?.[0]?.request_price}
      <span className='text-sm font-light text-gray-300'>&nbsp;/&nbsp;판</span>
    </p>
  );
}
