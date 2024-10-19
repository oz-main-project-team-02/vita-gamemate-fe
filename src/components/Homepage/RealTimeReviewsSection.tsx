import { mock } from '@/api/mock';
import { Review } from '@/config/types';
import { useQuery } from '@tanstack/react-query';

export default function RealTimeReviewsSection() {
  const { data: reviews } = useQuery<Review[]>({
    queryKey: ['review', 'new'], // 쿼리 키
    queryFn: async () => {
      const response = await mock.get(`/api/v1/users/review`);
      return response.data;
    },
  });
  console.log('reviews', reviews);

  return (
    <div className='flex h-[760px] items-center justify-center gap-36 px-[100px]'>
      <div>
        <div>
          <p className='text-base text-gray-300'>RECOMMEND CATEGORY</p>
          <h1 className='text-[48px]'>
            실시간 <span className='font-semibold'>생생후기</span>
          </h1>
          <p className='text-lg'>게임을 더 재미있게 만드는 방법?</p>
          <p className='text-lg'>믿을 수 있는 게임 메이트와 함께라면 가능합니다!</p>
        </div>
      </div>
      <div className='relative w-full max-w-[720px]'>
        <div className='flex flex-col gap-5'>
          {reviews?.map((review: Review) => (
            <div key={review.id} className='flex h-[100px] justify-between rounded-3xl bg-gray-200 px-4 py-3 shadow-lg'>
              <div>
                <h1 className='text-lg font-bold'>{review.request_id}</h1>
                <p>{review.content}</p>
              </div>
              <p className='text-gray-400'>{review.created_at.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* 그라데이션 오버레이 적용 */}
        <div className='absolute bottom-[-20px] left-[-20px] right-[-20px] h-[100px] bg-gradient-to-t from-primary to-transparent'></div>
      </div>
    </div>
  );
}
