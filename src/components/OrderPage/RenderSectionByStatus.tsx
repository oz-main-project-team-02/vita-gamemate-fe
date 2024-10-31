import { requestApi, walletApi } from '@/api';
import { useUserStore } from '@/config/store';
import { OrderRequest, OrderRequestResponse } from '@/config/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaHourglassHalf, FaStar } from 'react-icons/fa';
import { GiGamepad, GiStarsStack, GiTwoCoins } from 'react-icons/gi';

type Props = {
  order: OrderRequest;
  setSelectedOrder: (order: OrderRequest) => void;
};

export const RenderSectionByStatus = ({ order, setSelectedOrder }: Props) => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);

  const handleReviewClick = (order: OrderRequest) => {
    setSelectedOrder(order);
  };

  const cancelMutation = useMutation({
    mutationFn: async (game_request_id: number) => {
      const response = await requestApi.cancelRequest(game_request_id);
      if (response.status !== 204) {
        throw new Error(`요청 취소에 실패했습니다: ${response.status}`);
      }

      const rechargeResponse = await walletApi.rechargeWalletCoin(order.request_price * order.request_amount);
      console.log(rechargeResponse);
      if (rechargeResponse.status !== 200) {
        throw new Error(`코인 환불에 실패했습니다: ${rechargeResponse.status}`);
      }

      return { coin: rechargeResponse.data.coin };
    },
    onSuccess: ({ coin }) => {
      setUser({ coin });

      const value: OrderRequestResponse | undefined = queryClient.getQueryData(['orders']);

      if (value) {
        const index = value.results.findIndex((v) => order.game_request_id === v.game_request_id);
        const updateResults = value.results.filter((_, i) => i !== index);
        queryClient.setQueryData(['orders'], { ...value, results: updateResults });
        console.log('요청 취소 및 캐시 업데이트 완료: ', queryClient.getQueryData(['orders']));
      }
    },
    onError: (error) => {
      console.error('요청 취소 중 에러: ', error);
    },
  });

  if (order.status && order.review_status) {
    return (
      <div
        className='absolute inset-0 z-20 flex flex-col items-center justify-center rounded-xl py-4'
        style={{
          background: 'linear-gradient(to right, rgb(124, 58, 237), rgb(31, 47, 172))',
          opacity: 0.9,
        }}
      >
        <FaStar className='mb-4 h-12 w-12 text-yellow-300' />
        <h2 className='text-2xl font-bold text-white drop-shadow-lg'>리뷰 완료</h2>
        <p className='mt-2 text-lg text-yellow-200'>소중한 리뷰 감사합니다!</p>
        <div className='text-purple-600 mt-4 rounded-full bg-white px-6 py-2 font-semibold shadow-lg'>완료</div>
      </div>
    );
  }

  if (order.status) {
    return (
      <div
        className='absolute inset-0 z-20 flex flex-col items-center justify-center rounded-xl py-4'
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
          <button
            onClick={() => handleReviewClick(order)}
            className='text-purple-900 transform rounded-full bg-yellow-400 px-6 py-2 font-semibold transition duration-300 ease-in-out hover:scale-105 hover:bg-yellow-300'
          >
            리뷰 남기기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className='absolute inset-0 z-20 flex flex-col items-center justify-center rounded-xl py-4'
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
        <button
          onClick={() => cancelMutation.mutate(order.game_request_id)}
          className='transform rounded-full bg-white px-6 py-2 font-semibold text-orange-600 transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-100'
        >
          요청 취소하기
        </button>
      </div>
    </div>
  );
};
