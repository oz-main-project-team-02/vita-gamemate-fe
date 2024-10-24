import { requestApi } from '@/api';
import { User } from '@/config/types';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import ProfileImage from './ProfileImage';
import { useOrderModalStore } from '@/config/store';
import { getGame } from '@/config/const';

export function OrderModal({ mate }: { mate: User }) {
  const [amount, setAmount] = useState(1);
  const [price] = useState(mate?.mate_game_info?.[0]?.request_price || 0);
  const { setOrderModalClose } = useOrderModalStore();

  console.log(mate);

  const orderRequest = useMutation({
    mutationFn: async ({ price, amount }: { price: number; amount: number }) => {
      try {
        const { data } = await requestApi.MateRequest(mate.id, {
          game_id: mate?.mate_game_info?.[0]?.game_id,
          price,
          amount,
        });
        console.log('주문 요청:', price, amount);
        alert('주문이 완료되었습니다.');
        return data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  const handleOrderClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    orderRequest.mutate({ price, amount });
  };

  const game = getGame(mate?.mate_game_info?.[0]?.game_id);
  console.log('game', game);

  return (
    <div className='fixed inset-0 z-50 bg-black/50' onClick={() => setOrderModalClose()}>
      <div
        className='fixed right-0 h-full w-[780px] overflow-hidden bg-white px-4 py-2 shadow-sm'
        onClick={(e) => e.stopPropagation()}
      >
        {/* X 버튼, 채팅 */}
        <div className='flex h-full flex-col gap-7'>
          <div className='flex items-center gap-3'>
            <span className='cursor-pointer' onClick={setOrderModalClose}>
              <IoMdClose size={20} />
            </span>
            <span className='text-2xl font-semibold'>주문 확인</span>
          </div>

          <div className='flex flex-col gap-3 px-4'>
            {/* 사용자 정보 */}
            <div className='flex min-h-[49px] min-w-[49px] items-center gap-4 py-3'>
              <ProfileImage className='max-h-[84px] max-w-[84px] rounded-full' src={mate?.profile_image} />
              <div>
                <div className='text-3xl font-semibold'>{mate.nickname}</div>
                <p className='flex items-center pb-1'>
                  <img src='/src/assets/imgs/star.svg' alt='리뷰 별점 아이콘' className='h-[18px] w-[18px]' />
                  &nbsp;{mate.average_rating}&nbsp;
                  <span className='text-sm text-gray-300'>| 받은 의뢰수 {mate.amount}</span>
                </p>
              </div>
            </div>

            {/* 결제 내용 */}
            <div className='space-y-4 rounded-2xl bg-[#EFF5F8] p-5'>
              <div className='flex items-center justify-between rounded-xl bg-white px-4 py-2 shadow-sm'>
                <span className='text-gray-600'>주문 서비스:</span>
                <span className='font-medium'>리그오브레전드</span>
              </div>
              <div className='flex items-center justify-between rounded-xl bg-white px-4 py-2 shadow-sm'>
                <span className='text-gray-600'>단가:</span>
                <div className='flex items-center'>
                  <span className='text-gray-500'>950/판</span>
                </div>
              </div>
              <div className='flex items-center justify-between rounded-xl bg-white px-4 py-2 shadow-sm'>
                <span className='text-gray-600'>의뢰 수량:</span>
                <input
                  type='number'
                  min={1}
                  max={10}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className='py- w-16 rounded-md border border-gray-300 pl-3 text-center'
                />
              </div>
              <div className='flex items-center justify-between rounded-xl bg-white px-4 py-2 shadow-sm'>
                <span className='text-gray-600'>총가격:</span>
                <div className='flex items-center'>
                  <span className='font-medium'>950</span>
                </div>
              </div>
              <div className='flex items-center justify-between rounded-xl bg-white px-4 py-2 shadow-sm'>
                <span className='text-gray-600'>총 개수:</span>
                <span className='font-medium'>{amount} x 판</span>
              </div>
              <div className='flex items-center justify-between border-t border-gray-200 px-2 pt-4 shadow-sm'>
                <span className='text-gray-600'>최종 금액:</span>
                <div className='flex items-center gap-2'>
                  <img src='/src/assets/imgs/vitaCoin.svg' alt='비타코인' />
                  <span className='text-3xl font-bold text-primary'>{10 * amount}</span>
                </div>
              </div>
            </div>

            {/* 취소, 의뢰 */}
            <div className='flex justify-end gap-4 px-4 py-4'>
              <button className='rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                취소
              </button>
              <button className='rounded-md bg-blue-500 px-4 py-2 text-white' onClick={(e) => handleOrderClick(e)}>
                지금 의뢰하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
