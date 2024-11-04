import { MateGameInfo, Review } from '@/config/types';
import { useEffect, useRef, useState } from 'react';
import { fetchReviewsByGameId } from '@/api/review';
import star from '@/assets/imgs/star.svg';
import userImage from '@/assets/imgs/user.png';

type Props = {
  userId: string | undefined;
  selectGame: MateGameInfo | undefined;
  isReview: boolean;
  setIsReview: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ReviewSection({ userId, selectGame, isReview, setIsReview }: Props) {
  const [reviewData, setReviewData] = useState<Review[]>([]);
  const reviewRef = useRef(0);
  const [pageCount, setPageCount] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (selectGame === undefined) return;
    if (userId === undefined) return;

    (async () => {
      try {
        const data = await fetchReviewsByGameId(userId, selectGame.game_id.toString(), page);
        console.log(data);
        reviewRef.current = data?.count;
        setPageCount(data?.next);

        if (isReview) {
          data?.results?.map((data: Review) => setReviewData((e) => [...e, data]));
          setIsReview((e) => !e);
        } else {
          setReviewData(data?.results);
          setPage(1);
        }
      } catch (err) {
        console.error('error', err);
      }
    })();
  }, [selectGame, page]);

  return (
    <div className='relative right-[380px] w-[1000px] rounded-3xl border bg-[#FFFFFF] p-5'>
      <div className='mb-2 flex items-center'>
        <img className='w-7' src={star} alt='star' />
        <h1 className='px-2 text-2xl font-bold'>
          {selectGame?.average_rating} • 사용자 의견 ({reviewRef.current})
        </h1>
      </div>
      {reviewData?.length !== 0 ? (
        <>
          <div key={selectGame!.game_id}>
            {reviewData?.map((review, i) => (
              <div key={i} className='my-6 ml-2 flex h-[60px] w-full items-center'>
                <div className='w-[60px] rounded-full border bg-slate-200'>
                  <img className='w-[60px] rounded-full' src={userImage} alt='user' />
                </div>
                <div className='ml-3 w-3/4'>
                  <p className='text-[15px]'>{review.mate_nickname}</p>
                  <div className='flex'>
                    {new Array(review.rating).fill(0).map((_, i) => (
                      <img key={i} src={star} alt='star' />
                    ))}
                  </div>
                  <p className='w-[700px] truncate text-sm text-gray-400'>{review.content}</p>
                </div>
                <p className='ml-auto mr-3 mt-[-30px] w-auto origin-left text-xs text-gray-300'>
                  {new Date(review.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {pageCount !== null && (
            <div
              onClick={() => {
                setPage((e) => e + 1);
                setIsReview((e) => !e);
              }}
              className='flex justify-center'
            >
              <button className='h-[35px] w-[110px] rounded-xl bg-softYellow hover:font-semibold'>자세히 보기</button>
            </div>
          )}
        </>
      ) : (
        <div className='my-10 text-center'>해당 유저의 게임 리뷰가 없습니다</div>
      )}
    </div>
  );
}
