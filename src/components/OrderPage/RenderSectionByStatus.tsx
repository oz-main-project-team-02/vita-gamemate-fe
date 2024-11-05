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

  // INFO: 의뢰를 신청했지만, 상대방이 수락하지 않은 경우 의뢰를 취소할 수 있습니다.
  const cancelMutation = useMutation({
    mutationFn: async (game_request_id: number) => {
      // 1. 의뢰 취소 API 호출
      const response = await requestApi.cancelRequest(game_request_id);
      if (response.status !== 204) {
        throw new Error(`요청 취소에 실패했습니다: ${response.status}`);
      }
      // 2. 코인 환불 API 호출
      const rechargeResponse = await walletApi.rechargeWalletCoin(order.request_price * order.request_amount);
      if (rechargeResponse.status !== 200) {
        throw new Error(`코인 환불에 실패했습니다: ${rechargeResponse.status}`);
      }
      // 3. 의뢰 취소 및 코인 환불 성공 시, 코인 정보를 반환
      return { coin: rechargeResponse.data.coin };
    },
    onSuccess: ({ coin }) => {
      // 4. 사용자의 코인 정보를 업데이트 ( 헤더 )
      setUser({ coin });

      // INFO: 사용자의 지갑은 업데이트 했지만, 사용자의 의뢰 페이지에는 아직 기록이 남아있어 그 기록을 지우기 위해 캐시를 업데이트합니다.

      // 5. 저장되어 있는 캐시 데이터를 가져옵니다.
      const value: OrderRequestResponse | undefined = queryClient.getQueryData(['orders']);

      if (value) {
        // 6. 캐시 데이터에서 해당 의뢰의 인덱스를 찾아줍니다.
        const index = value.results.findIndex((v) => order.game_request_id === v.game_request_id);
        // 7. 찾은 인덱스를 통해 해당 의뢰를 제외한 나머지 의뢰를 새로운 배열로 만들어 React의 불변성을 유지합니다.
        const updateResults = value.results.filter((_, i) => i !== index);
        // 8. 업데이트 된 결과물로 기존 데이터를 복사하고, 복사한 데이터 위에 교체할 데이터를 채워줍니다.
        queryClient.setQueryData(['orders'], { ...value, results: updateResults });
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
