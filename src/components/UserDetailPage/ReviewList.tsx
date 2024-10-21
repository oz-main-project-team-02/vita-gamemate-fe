import { client } from '@/api/client';
import { Review } from '@/config/types';
import { useQuery } from '@tanstack/react-query';

type Props = {
  userId: string;
};

export default function ReviewList({ userId }: Props) {
  // FIXME: 아직 개발되지 않은 API
  // TODO: useInfiniteQuery() 교체 예정
  const { data: reviews } = useQuery({
    queryKey: ['user', userId, 'reviews'],
    queryFn: async () => {
      try {
        const { data } = await client.get(`/api/v1/reviews/${userId}/?page=1`);
        return data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  if (!reviews || !Array.isArray(reviews)) {
    return <p>리뷰가 존재하지 않습니다.</p>; // 배열이 아니면 예외 처리
  }

  return (
    <div className='mb-6 flex h-14 w-full items-center justify-end'>
      {reviews?.map((review: Review, i) => (
        <div key={i}>
          <div className='h-10 w-10 rounded-full border bg-slate-200'>
            <img className='h-10 w-10 rounded-full' src='/src/assets/imgs/user.png' alt='user' />
          </div>
          <div className='ml-2 h-14 w-3/4'>
            <div className='flex'>
              <img src='/src/assets/imgs/star.svg' alt='star' />
              <img src='/src/assets/imgs/star.svg' alt='star' />
              <img src='/src/assets/imgs/star.svg' alt='star' />
              <img src='/src/assets/imgs/star.svg' alt='star' />
              <img src='/src/assets/imgs/star.svg' alt='star' />
            </div>
            <p className='text-sm text-gray-400'>{review.content}</p>
          </div>
          <p className='ml-auto mt-[-40px] w-auto origin-left text-xs text-gray-300'>10-17 1:18</p>
        </div>
      ))}
    </div>
  );
}
