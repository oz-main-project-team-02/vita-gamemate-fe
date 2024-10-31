// import { reviewApi } from '@/api';
// import { Review } from '@/config/types';
// import { useQuery } from '@tanstack/react-query';

import { fetchReviewsByGameId } from '@/api/review';
import { MateGameInfo } from '@/config/types';
import { useEffect, useState } from 'react';

type Props = {
  userId: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  selectGame: MateGameInfo | undefined;
  isReview: boolean;
  setIsReview: React.Dispatch<React.SetStateAction<boolean>>;
};

// export default function ReviewList({ userId }: Props) {
//   // FIXME: 아직 개발되지 않은 API
//   // TODO: useInfiniteQuery() 교체 예정
//   console.log(userId);
//   const { data: reviews } = useQuery<Review[]>({
//     queryKey: ['user', userId, 'reviews'],
//     queryFn: () => reviewApi.fetchReviewsById(userId, 1),
//   });

//   if (!reviews || !Array.isArray(reviews)) {
//     return <p>리뷰가 존재하지 않습니다.</p>;
//   }

//   return (
//     <div className='mb-6 flex h-14 w-full items-center justify-end'>
//       {reviews?.map((review: Review, i) => (
//         <div key={i}>
//           <div className='h-10 w-10 rounded-full border bg-slate-200'>
//             <img className='h-10 w-10 rounded-full' src='/src/assets/imgs/user.png' alt='user' />
//           </div>
//           <div className='ml-2 h-14 w-3/4'>
//             <div className='flex'>
//               {new Array(review.rating).fill(0).map((_, i) => (
//                 <img key={i} src='/src/assets/imgs/star.svg' alt='star' />
//               ))}
//             </div>
//             <p className='text-sm text-gray-400'>{review.content}</p>
//           </div>
//           <p className='ml-auto mt-[-40px] w-auto origin-left text-xs text-gray-300'>
//             {review.created_at.toLocaleString()}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

export default function ReviewList({ userId, page, setPage, selectGame, isReview, setIsReview }: Props) {
  const [reviewData, setReviewData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReviewsByGameId(userId!, selectGame!.game_id.toString(), page);
        console.log(data);

        if (isReview) {
          data?.results?.map((data) => setReviewData((e) => [...e, data]));
          setIsReview((e) => !e);
        } else {
          setReviewData(data?.results);
          setPage(1);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchId = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(fetchId);
  }, [selectGame!.game_id, page]);

  return (
    <div key={selectGame!.game_id}>
      {reviewData &&
        reviewData?.map((review, i) => (
          <div key={i} className='my-6 ml-2 flex h-[60px] w-full items-center'>
            <div className='w-[60px] rounded-full border bg-slate-200'>
              <img className='w-[60px] rounded-full' src='/src/assets/imgs/user.png' alt='user' />
            </div>
            <div className='ml-3 w-3/4'>
              <p className='text-[15px]'>{review.mate_nickname}</p>
              <div className='flex'>
                {new Array(review.rating).fill(0).map((_, i) => (
                  <img key={i} src='/src/assets/imgs/star.svg' alt='star' />
                ))}
              </div>
              <p className='w-[700px] truncate text-sm text-gray-400'>{review.content}</p>
            </div>
            <p className='ml-auto mt-[-30px] w-auto origin-left text-xs text-gray-300'>
              {review.created_at.toLocaleString()}
            </p>
          </div>
        ))}
    </div>
  );
}
