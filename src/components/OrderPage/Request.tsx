import { requestApi } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { OrderRequest, OrderRequestResponse } from '@/config/types';
import Gender from '../Common/Gender';
import Review from './Review';
import { useState } from 'react';
import { GiGamepad, GiTwoCoins, GiStarsStack } from 'react-icons/gi';
import { FaCalendarAlt, FaCoins, FaHourglassHalf, FaRedo } from 'react-icons/fa';
import dayjs from 'dayjs';

dayjs.locale('ko');

export default function Request() {
  const [showReview, setShowReview] = useState(false);

  const { data } = useQuery<OrderRequestResponse>({
    queryKey: ['orders'],
    queryFn: requestApi.fetchMyOrders,
  });

  console.log('주문 목록: ', data);

  return (
    <>
      {data?.results?.map((order: OrderRequest) => (
        <div
          key={order.mate_id}
          className='relative mt-[38px] flex flex-col rounded-xl border border-gray-200 bg-[#FFFFFF] p-6 shadow-lg transition-all duration-300 hover:shadow-xl md:flex-row'
        >
          <div className='flex w-full flex-grow items-center gap-4'>
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

          {order.status ? (
            <div
              className='absolute inset-0 z-20 flex flex-col items-center justify-center py-4'
              style={{
                background: 'linear-gradient(to right, rgba(128, 0, 128, 0.8), rgba(75, 0, 130, 0.8))',
              }}
            >
              <div className='flex justify-center space-x-4'>
                <GiGamepad className='h-10 w-10 animate-bounce text-yellow-300' />
                <GiStarsStack className='h-10 w-10 animate-pulse text-yellow-300' />
                <GiTwoCoins className='h-10 w-10 animate-bounce text-yellow-300' />
              </div>
              <h2 className='text-2xl font-bold text-white drop-shadow-lg'>게임 시간 어떠셨나요?</h2>
              <p className='text-lg text-yellow-200'>함께한 순간이 특별했기를 바랍니다!</p>
              <div className='mt-2'>
                <button className='text-purple-900 transform rounded-full bg-yellow-400 px-6 py-2 font-semibold transition duration-300 ease-in-out hover:scale-105 hover:bg-yellow-300'>
                  리뷰 남기기
                </button>
              </div>
            </div>
          ) : (
            <div
              className='absolute inset-0 z-20 flex flex-col items-center justify-center py-4'
              style={{
                background: 'linear-gradient(to right, rgb(255, 165, 0), rgb(255, 140, 0))',
                opacity: 0.8,
              }}
            >
              <div className='flex justify-center space-x-4'>
                <FaHourglassHalf className='h-10 w-10 animate-pulse text-white' />
              </div>
              <h2 className='text-2xl font-bold text-white drop-shadow-lg'>게임 요청 수락 대기 중</h2>
              <p className='text-lg text-white'>상대방의 수락을 기다리고 있습니다.</p>
              <div className='mt-2'>
                <button className='transform rounded-full bg-white px-6 py-2 font-semibold text-orange-600 transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-100'>
                  요청 취소하기
                </button>
              </div>
            </div>
          )}

          {/* 리뷰 모달 */}
          {showReview && <Review order={order} showReview={showReview} setShowReview={setShowReview} />}
        </div>
      ))}
    </>
  );
}
