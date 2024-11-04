import React, { useState } from 'react';
import { getGame } from '@/config/const';
import { MateGameInfo, User } from '@/config/types';
import Pagination from './Pagination';
import { OrderModal } from './OrderModal';

interface ChatMateRequestInfoProps {
  mateGameInfo: MateGameInfo[];
  setOrderModalOpen: () => void;
  isOrderModalOpen: boolean;
  mate: User | null;
}

const ChatMateRequestInfo: React.FC<ChatMateRequestInfoProps> = ({
  mate,
  isOrderModalOpen,
  mateGameInfo,
  setOrderModalOpen,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 1;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = mateGameInfo.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(mateGameInfo.length / cardsPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderGameInfo = (game: MateGameInfo) => {
    const selectGame = mateGameInfo.find((v) => v.game_id === game.game_id);

    return (
      <div className='sticky top-0 z-10 mx-3 flex items-center gap-3 rounded-xl bg-white px-4 py-2' key={game.game_id}>
        <img
          className='h-[75px] w-[75px] object-contain'
          src={getGame(game.game_id)?.gameCardImg}
          alt={getGame(game.game_id)?.title}
        />
        <div className='flex min-w-[180px] grow flex-col gap-[1px]'>
          <span className='max-w-[192px] truncate font-semibold'>{getGame(game.game_id)?.title}</span>
          {game.average_rating ? (
            <div className='flex items-center gap-[1px]'>
              <img src='/src/assets/imgs/star.svg' alt='리뷰 별점 아이콘' className='h-[16px] w-[16px]' />
              <span className='text-sm'>{game.average_rating}</span>
              <span className='max-w-[192px] truncate text-sm text-gray-300'>&nbsp;| 리뷰 수 {game.review_count}</span>
            </div>
          ) : (
            <span className='max-w-[192px] truncate text-sm text-gray-300'>
              {game.level ? game.level : game.description}
            </span>
          )}
          <div className='flex items-center gap-1'>
            <img className='h-5 w-5 rounded-full' src='/favicon.png' alt='Favicon' />
            <span className='font-semibold text-primary'>{game.request_price}</span>
            <span className='text-sm text-gray-300'>/판</span>
          </div>
        </div>
        <button
          className='rounded-lg bg-gradient-to-r from-primary to-limeGreen px-4 py-1 font-semibold'
          onClick={setOrderModalOpen}
        >
          의뢰
        </button>
        {/* Order Modal */}
        {/* FIXME: selectGame이 추가되어야함, mateGameInfo가 0번 인덱스의 값으로 설정되어 있음. 추후 모든 게임 인포를 제공하고 선택한 게임의 info를 selectGame으로 넘겨주면됨. */}
        {isOrderModalOpen && mate && selectGame && <OrderModal selectGame={selectGame} mate={mate} />}
      </div>
    );
  };

  if (mateGameInfo.length === 1) {
    return renderGameInfo(mateGameInfo[0]);
  }

  return (
    <Pagination totalPages={totalPages} paginate={paginate} currentPage={currentPage}>
      {currentCards.map(renderGameInfo)}
    </Pagination>
  );
};

export default ChatMateRequestInfo;
