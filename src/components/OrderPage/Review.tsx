import { reviewApi } from '@/api';
import { OrderRequest, OrderRequestResponse } from '@/config/types';
import debounce from '@/utils/debounce';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface ReviewProps {
  showReview: boolean;
  setShowReview: React.Dispatch<React.SetStateAction<boolean>>;
  order: OrderRequest;
}

type ReviewData = {
  rating: number;
  content: string;
};

export default function Review({ order, showReview, setShowReview }: ReviewProps) {
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewData, setReviewData] = useState<ReviewData>({
    rating: 0,
    content: '',
  });
  const queryClient = useQueryClient();
  console.log(order);

  // INFO: 리뷰 작성 mutation
  const reviewMutation = useMutation({
    mutationFn: async ({ game_request_id, reviewData }: { game_request_id: number; reviewData: ReviewData }) => {
      return await reviewApi.fetchPostReview(game_request_id, reviewData);
    },
    onSuccess: async (response) => {
      if (response.status === 200) {
        const value: OrderRequestResponse | undefined = queryClient.getQueryData(['orders']);

        const index = value?.results.findIndex((v) => v.game_request_id === order?.game_request_id);
        const updateResults = value?.results.map((v, i) => (i === index ? { ...value, status: true } : v));
        // INFO: 캐시 업데이트, 전체 객체를 불변성을 유지하면서 업데이트
        queryClient.setQueryData(['orders'], { ...value, results: updateResults });
      }
    },
  });

  // INFO: 리뷰 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    reviewMutation.mutate({ game_request_id: order.game_request_id, reviewData });
  };

  useEffect(() => {
    if (showReview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showReview]);

  const handleClickRating = (value: number) => {
    setReviewData({ ...reviewData, rating: value });
  };

  const handleMouseEnter = (value: number) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleContentChange = debounce((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewData({ ...reviewData, content: e.target.value });
  }, 1000);

  return (
    <>
      <div className='fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-10'>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className='absolute z-20 h-[373px] rounded-3xl bg-[#FFFFFF] px-[41px] py-[33px]'
        >
          <h1 className='text-lg font-extrabold'>리뷰 작성하기</h1>
          <p className='mb-1 text-sm text-gray-300'>행복했던 순간을 나눠주세요!</p>
          <div className='flex text-base'>
            {Array.from({ length: 5 }, (_, i) => {
              const starValue = i + 1;

              return (
                <svg
                  key={i}
                  onClick={() => handleClickRating(starValue)}
                  onMouseEnter={() => handleMouseEnter(starValue)}
                  onMouseLeave={handleMouseLeave}
                  width='14'
                  height='14'
                  viewBox='0 0 14 14'
                  fill={(reviewData.rating || hoverRating) >= starValue ? '#FFBB33' : '#bbbbbb'}
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M6.5793 0.654979C6.77609 0.348598 7.22391 0.348598 7.4207 0.654979L9.28113 3.55148C9.34883 3.65689 9.45365 3.73305 9.57483 3.76487L12.9045 4.63918C13.2567 4.73166 13.3951 5.15755 13.1645 5.43939L10.9846 8.10383C10.9053 8.2008 10.8653 8.32402 10.8725 8.4491L11.0699 11.886C11.0907 12.2495 10.7285 12.5127 10.3892 12.3805L7.18152 11.1307C7.06478 11.0852 6.93522 11.0852 6.81848 11.1307L3.61084 12.3805C3.27155 12.5127 2.90926 12.2495 2.93014 11.886L3.12754 8.4491C3.13472 8.32402 3.09469 8.2008 3.01535 8.10383L0.835524 5.43939C0.60495 5.15755 0.743331 4.73166 1.09553 4.63918L4.42517 3.76487C4.54635 3.73305 4.65117 3.65689 4.71887 3.55148L6.5793 0.654979Z' />
                </svg>
              );
            })}
          </div>
          <textarea
            onChange={(e) => handleContentChange(e)}
            className='mt-2 h-[181px] w-full rounded-2xl border p-4 focus:outline-none'
            placeholder='재미있었어요!'
          />
          <button
            type='submit'
            className='float-right mt-[18px] h-[38px] w-[185px] rounded-xl border border-gray-300 bg-[#D9D9D9]'
          >
            제출하기
          </button>
          <button onClick={() => setShowReview(false)} className='absolute right-[60px] top-[35px] text-gray-400'>
            ✕
          </button>
        </form>
      </div>
    </>
  );
}
