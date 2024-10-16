import { GameMate } from "../../config/types";

type Props = {
  mate: GameMate;
};

export default function VitaPrice({ mate }: Props) {
  return (
    <p className='flex items-center text-deepYellow text-lg font-bold '>
      <img src='/src/assets/imgs/vitaCoin.svg' alt='비타 코인 아이콘' />
      &nbsp;{mate?.price}
      <span className='text-sm font-light text-gray-300'>&nbsp;/&nbsp;판</span>
    </p>
  );
}
