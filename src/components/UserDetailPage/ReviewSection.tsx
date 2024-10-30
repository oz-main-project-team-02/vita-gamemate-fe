import { MateGameInfo } from '@/config/types';
import ReviewList from './ReviewList';
import { useState } from 'react';

type Props = {
  userId: string | undefined;
  selectGame: MateGameInfo[];
};

export default function ReviewSection({ userId, selectGame }: Props) {
  const [page, setPage] = useState(1);
  const [isPage, setIsPage] = useState<boolean>(false);

  console.log(page);
  return (
    <>
      {selectGame[0] !== undefined ? (
        <div className='relative right-[380px] w-[1000px] rounded-3xl border bg-[#FFFFFF] p-5'>
          <div className='mb-2 flex items-center'>
            <img className='w-7' src='/src/assets/imgs/star.svg' alt='star' />
            <h1 className='px-2 text-2xl font-bold'>
              {selectGame[0].average_rating} • 사용자 의견 ({selectGame[0].review_count})
            </h1>
          </div>
          <ReviewList
            userId={userId!}
            page={page}
            setPage={setPage}
            selectGame={selectGame}
            isPage={isPage}
            setIsPage={setIsPage}
          />

          <div
            onClick={() => {
              setPage((e) => e + 1);
              setIsPage((e) => !e);
            }}
            className='flex justify-center'
          >
            <button className='h-[35px] w-[110px] rounded-xl bg-softYellow hover:font-semibold'>자세히 보기</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
