import { mock } from '@/api/mock';
import { useQuery } from '@tanstack/react-query';
import SkeletonReveiwCard from '../skeleton/SkeletonReviewCard';
import { delay } from '@/utils/delay';
import { Review } from '@/config/types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
// import { Review } from '@/config/types';
// import { reviewApi } from '@/api';

dayjs.locale('ko');
dayjs.extend(relativeTime);

export default function RealTimeReviewsSection() {
  const { data, isLoading } = useQuery({
    queryKey: ['review', 'new'], // 쿼리 키
    queryFn: async () => {
      // FIXME: 실제 서비스에서는 delay 함수를 사용하지 않습니다.
      // FIXME: delay 함수 제거시 async await 구문 제거
      await delay();
      const response = await mock.get(`/api/v1/users/review`);
      return response.data;
    },
  });
  // FIXME: API 완료 시 교체 예정
  // const { data } = useQuery<Review[]>({
  //   queryKey: ['review', 'new'], // 쿼리 키
  //   queryFn: () => reviewApi.fetchReviews(),
  // });

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
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonReveiwCard key={i} />)
            : data?.map((review: Review, i: number) => (
                <div key={i} className='flex h-[100px] justify-between rounded-3xl bg-white px-4 py-3 shadow-lg'>
                  <div>
                    <h1 className='text-lg font-bold'>{review.game_request_id}</h1>
                    <div className='flex'>
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <img key={i} src='/src/assets/imgs/star.svg' alt='별점' />
                      ))}
                    </div>
                    <div>{review.content}</div>
                  </div>
                  <div className='flex flex-col items-end justify-between'>
                    <p className='text-gray-400'>{dayjs(review.created_at).fromNow()}</p>
                    {/* FIX: review에서 게임메이트의 아이디를 받아올 수 있어야함. */}
                    <Link to={`/user/${review.game_request_id}`}>
                      <button className='rounded-md bg-primary px-3 py-2 font-semibold text-primaryText'>
                        메이트 정보 확인하기
                      </button>
                    </Link>
                  </div>
                </div>
              ))}

          {/* FIXME: API 완료 시 교체 예정 */}
          {/* {reviews?.map((review: Review, i) => (
            <div key={i} className='flex h-[100px] justify-between rounded-3xl bg-gray-200 px-4 py-3 shadow-lg'>
              <div>
                <h1 className='text-lg font-bold'>{review.game_request_id}</h1>
                <p>{review.content}</p>
              </div>
              <p className='text-gray-400'>{review.created_at.toLocaleString()}</p>
            </div>
          ))} */}
        </div>

        {/* 그라데이션 오버레이 적용 */}
        <div className='absolute bottom-[-20px] left-[-20px] right-[-20px] h-[100px] bg-gradient-to-t from-primary to-transparent'></div>
      </div>
    </div>
  );
}
