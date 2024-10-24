import { requestApi } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { OrderRequest, OrderRequestResponse } from '@/config/types';
import Gender from '../Common/Gender';
import OnlineFlag from '../Common/OnlineFlag';
import Review from './Review';
import { useState } from 'react';

export default function Request() {
  const [showReview, setShowReview] = useState(false);

  const { data } = useQuery<OrderRequestResponse>({
    queryKey: ['orders'],
    queryFn: requestApi.fetchMyOrders,
  });

  return (
    <>
      {data?.results?.map((order: OrderRequest) => {
        <div className='mt-[38px] flex h-[213px] w-full rounded-xl border border-gray-200 bg-[#FFFFFF] px-[37px] py-[25px]'>
          {/* 유저 이미지 섹션 */}
          <div className='min-h[160px] min-w-[160px] rounded-3xl border border-gray-200 bg-[#F8F8F8]'>
            <img
              className='h-[160px] w-[160px] p-1'
              src={order.mate_profile_image ? order.mate_profile_image : '/src/assets/imgs/user.png'}
              alt='user'
            />
          </div>
          {/* 유저 데이터 섹션 */}
          <div className='mx-8 h-[163px] w-1/2 py-2'>
            <p className='text-base'>{order.mate_nickname}</p>
            <div className='relative mb-[42px] mt-1 flex h-[20px] w-full items-start'>
              <Gender gender={'male'} birthday={null} />
              <div className='relative ml-[-8px] mt-[-9px] w-[100px]'>
                <OnlineFlag />
              </div>
            </div>
            <p className='mb-1'>의뢰 신청 : {new Date(order.request_date).toLocaleString('ko-KR')}</p>
            <p>총 개수 : {order.request_amount}</p>
          </div>

          {/* 리뷰 버튼 섹션 */}
          <div className='flex flex-col justify-center'>
            <button
              onClick={() => setShowReview(true)}
              type='button'
              className='rounded-xl bg-primary px-3 py-2 text-[16px] font-semibold hover:scale-110 hover:opacity-80'
            >
              리뷰쓰기
            </button>
          </div>

          {/* 리뷰 모달 */}
          {showReview && <Review order={order} showReview={showReview} setShowReview={setShowReview} />}
        </div>;
      })}
    </>
  );
}
