import { getGame } from '@/config/const';
import VitaPrice from '../Common/VitaPrice';
import { useErrorStore, useOrderModalStore } from '@/config/store';
import { User } from '@/config/types';
import star from '@/assets/imgs/star.svg';

type Props = {
  mate: User;
  gameId: number;
};

export default function GameOrderSection({ mate, gameId }: Props) {
  const { setOrderModalOpen } = useOrderModalStore();
  const selectGame = mate.mate_game_info?.find((game) => game.game_id === gameId);
  const { updateError } = useErrorStore();

  const handleOrdersClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null) {
      return updateError(new Error('로그인이 필요합니다.'));
    }

    setOrderModalOpen();
  };

  return (
    <div className='flex h-[193px] w-full rounded-3xl border bg-[#FFFFFF] p-8'>
      {selectGame !== undefined ? (
        <>
          <div
            className='hidden h-[130px] w-[130px] overflow-hidden rounded-3xl bg-gray-100 sm:block'
            style={{
              backgroundImage: `url(${getGame(gameId)?.img})`,
              backgroundSize: '130px 150px',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '0px 0px',
            }}
          ></div>
          <div className='h-[82px] w-3/5 px-4 py-1'>
            <h1 className='pb-1 text-xl font-bold sm:text-2xl'>{getGame(gameId)?.title}</h1>
            <p className='flex items-center pb-1 text-[12px] sm:text-base'>
              <img src={star} alt='리뷰 별점 아이콘' className='h-[18px] w-[18px]' />
              &nbsp;{selectGame.average_rating}&nbsp;
              <span className='text-[12px] text-gray-300 sm:text-sm'>
                | 받은 의뢰수 {selectGame.game_request_count}
              </span>
            </p>
            <VitaPrice gameId={gameId} mate={mate} />
          </div>
          <button
            onClick={(e) => handleOrdersClick(e)}
            className='my-8 h-[50px] w-[100px] rounded-xl bg-gradient-to-r from-primary to-limeGreen text-[24px] font-bold sm:w-[120px]'
          >
            의뢰
          </button>
        </>
      ) : (
        <div className='my-auto w-full text-center text-xl font-bold'>게임을 골라주세요!</div>
      )}
    </div>
  );
}
