import { requestApi } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { OrderRequest, OrderRequestResponse } from '@/config/types';
import Gender from '../Common/Gender';
import Review from './Review';
import { useState } from 'react';

export default function Request() {
  const [showReview, setShowReview] = useState(false);

  const { data } = useQuery<OrderRequestResponse>({
    queryKey: ['orders'],
    queryFn: requestApi.fetchMyOrders,
  });

  console.log('주문 목록: ', data);

  return data?.results?.map((order: OrderRequest) => (
    <div
      key={order.request_date.toString()}
      className='mt-[38px] flex flex-col items-center rounded-xl border border-gray-200 bg-[#FFFFFF] p-6 md:flex-row'
    >
      <div className='flex w-full flex-grow gap-4'>
        {/* 유저 이미지 섹션 */}
        <div className='hidden rounded-lg border border-gray-200 bg-[#F8F8F8] lg:block lg:h-[120px] lg:w-[120px] xl:h-[160px] xl:w-[160px]'>
          <img
            className='rounded-lg p-1 lg:h-[120px] lg:w-[120px] xl:h-[160px] xl:w-[160px]'
            src={order.mate_profile_image ? order.mate_profile_image : '/src/assets/imgs/user.png'}
            alt='user'
          />
        </div>
        {/* 유저 데이터 섹션 */}
        <div className='flex-grow py-2'>
          <p className='text-xl font-bold'>{order.mate_nickname}</p>
          <div className='relative mb-2 mt-1 flex h-[20px] w-full items-start'>
            <Gender gender={order.mate_gender} birthday={null} />
            <div className='rounded-full border border-white bg-mintGreen px-2 text-sm text-white'>• 온라인</div>
          </div>
          <p className='mb-1'>의뢰 신청 : {new Date(order.request_date).toLocaleString('ko-KR')}</p>
          <p>총 개수 : {order.request_amount}</p>
        </div>
      </div>

      {/* 리뷰 버튼 섹션 */}
      <div className='flex flex-row md:flex-col'>
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
    </div>
  ));
}
