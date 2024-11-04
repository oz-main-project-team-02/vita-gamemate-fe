import { requestApi } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { OrderRequest, OrderRequestResponse } from '@/config/types';
import Gender from '../Common/Gender';
import Review from './Review';
import { useState } from 'react';
import { FaCalendarAlt, FaCoins, FaHourglassHalf, FaRedo } from 'react-icons/fa';
import dayjs from 'dayjs';
import { RenderSectionByStatus } from './RenderSectionByStatus';
import userImage from '@/assets/imgs/user.png';

dayjs.locale('ko');

export default function Request() {
  const [selectedOrder, setSelectedOrder] = useState<OrderRequest | null>(null);

  const { data } = useQuery<OrderRequestResponse>({
    queryKey: ['orders'],
    queryFn: requestApi.fetchMyOrders,
  });

  return (
    <div className='mt-6 space-y-6'>
      {data?.results?.map((order: OrderRequest) => (
        <div
          key={order.game_request_id}
          className='relative flex flex-col rounded-xl border border-gray-200 bg-[#FFFFFF] p-6 shadow-lg transition-all duration-300 hover:shadow-xl md:flex-row'
        >
          <div className='flex w-full flex-grow items-center gap-4'>
            {/* 유저 이미지 섹션 */}
            <div className='hidden rounded-lg border border-gray-200 bg-[#F8F8F8] lg:block lg:h-[120px] lg:w-[120px] xl:h-[160px] xl:w-[160px]'>
              <img
                className='rounded-lg p-1 lg:h-[120px] lg:w-[120px] xl:h-[160px] xl:w-[160px]'
                src={order.mate_profile_image ? order.mate_profile_image : userImage}
                alt='user'
              />
            </div>
            {/* 유저 데이터 섹션 */}
            <div className='flex-grow py-2'>
              <div className='flex items-center gap-2'>
                <h2 className='text-2xl font-bold text-gray-800'>{order.mate_nickname}</h2>
                <Gender gender={order.mate_gender} birthday={null} />
                {order.mate_online && (
                  <div className='rounded-full border border-white bg-mintGreen px-2 text-sm text-white'>• 온라인</div>
                )}
              </div>

              <div className='space-y-2 text-sm text-gray-600'>
                <p className='flex items-center'>
                  <FaCalendarAlt className='text-purple-500 mr-2' />
                  신청일: {dayjs(order.request_date).format('YYYY년 MM월 DD일 HH:mm')}
                </p>
                <p className='flex items-center'>
                  <FaCoins className='mr-2 text-yellow-500' />
                  가격:{' '}
                  <span className='ml-1 font-semibold text-gray-800'>
                    {(order.request_price * order.request_amount).toLocaleString()}원
                  </span>
                </p>
                <p className='flex items-center'>
                  <FaRedo className='mr-2 text-green-500' />
                  횟수: <span className='ml-1 font-semibold text-gray-800'>{order.request_amount}회</span>
                </p>
                <p className='flex items-center'>
                  <FaHourglassHalf className='mr-2 text-orange-500' />
                  상태: <span className='ml-1 font-semibold text-orange-600'>수락 대기 중</span>
                </p>
              </div>
            </div>
          </div>
          <RenderSectionByStatus order={order} setSelectedOrder={setSelectedOrder} />

          {/* 리뷰 모달 */}
          {selectedOrder?.game_request_id === order.game_request_id && (
            <Review order={order} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
          )}
        </div>
      ))}
    </div>
  );
}
