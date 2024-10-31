import { requestApi, walletApi } from '@/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReceivedRequest, ReceivedRequestResponse } from '@/config/types';
import Gender from '../Common/Gender';
import { useUserStore } from '@/config/store';
import { FaCalendarAlt, FaCheckCircle, FaCoins, FaRedo, FaTimesCircle } from 'react-icons/fa';
import dayjs from 'dayjs';
import { GiGamepad, GiStarsStack, GiTwoCoins } from 'react-icons/gi';

dayjs.locale('ko');

export default function Response() {
  const setUser = useUserStore((state) => state.setUser);
  const queryClient = useQueryClient();

  const { data } = useQuery<ReceivedRequestResponse>({
    queryKey: ['receivedOrders'],
    queryFn: requestApi.fetchReceivedOrders,
  });

  console.log('받은 주문 목록: ', data);

  // INFO: 특정 게임 요청을 수락하고 캐시에서 해당 요청을 업데이트 mutation
  const aceeptMutation = useMutation({
    mutationFn: async ({
      game_request_id,
      request_amount,
      request_price,
    }: {
      game_request_id: number;
      request_amount: number;
      request_price: number;
    }) => {
      const response = await requestApi.updateRequestStatus(game_request_id, true);
      if (response.status === 200) {
        return { game_request_id, request_amount, request_price };
      }
      throw new Error('요청을 수락하는데 실패했습니다.');
    },
    onSuccess: async ({ game_request_id, request_amount, request_price }) => {
      try {
        const { data: coin } = await walletApi.rechargeWalletCoin(request_price * request_amount);
        setUser({ coin: coin.coin });
        console.log('코인 추가: ', coin);

        const value: ReceivedRequestResponse | undefined = queryClient.getQueryData(['receivedOrders']);

        if (value) {
          const index = value.results.findIndex((v) => game_request_id === v.game_request_id);
          const updateResults = value.results.map((v, i) => (i === index ? { ...v, status: true } : v));
          // INFO: 캐시 업데이트, 전체 객체를 불변성을 유지하면서 업데이트
          queryClient.setQueryData(['receivedOrders'], { ...value, results: updateResults });
          console.log('요청 수락 및 캐시 업데이트 완료: ', queryClient.getQueryData(['receivedOrders']));
        }

        return data;
      } catch (err) {
        console.error('지갑 충전 및 캐시 업데이트 중 에러: ', err);
      }
    },
    onError: (error) => {
      console.error('요청 수락 중 에러: ', error);
    },
  });

  const handleAcceptClick = async (game_request_id: number, request_amount: number, request_price: number) => {
    aceeptMutation.mutate({ game_request_id, request_amount, request_price });
  };

  // INFO: 특정 게임 요청을 취소하고 캐시에서 해당 요청을 제거하는 mutation
  const cancelMutation = useMutation({
    mutationFn: async (game_request_id: number) => {
      const response = await requestApi.updateRequestStatus(game_request_id, false);

      if (response.status === 200) {
        return game_request_id;
      }
      throw new Error('요청을 취소하는데 실패했습니다.');
    },
    onSuccess: () => {
      const value: ReceivedRequestResponse | undefined = queryClient.getQueryData(['receivedOrders']);

      if (value) {
        const index = value.results.findIndex((v) => 30 === v.game_request_id);

        const updateResults = value.results.filter((_, i) => i !== index);

        // INFO: 캐시 업데이트, 전체 객체를 불변성을 유지하면서 업데이트
        queryClient.setQueryData(['receivedOrders'], { ...value, count: value.count - 1, results: updateResults });
        console.log('요청 취소 및 캐시 업데이트 완료: ', queryClient.getQueryData(['receivedOrders']));
      }
    },
    onError: (error) => {
      console.error('요청 취소 중 에러: ', error);
    },
  });

  const handleCancelClick = async (game_request_id: number) => {
    cancelMutation.mutate(game_request_id);
  };

  return (
    <div className='mt-6 space-y-6'>
      {data?.results?.map((receivedData: ReceivedRequest) => (
        <div
          key={receivedData.game_request_id}
          className='relative flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl md:flex-row'
        >
          <div className='flex w-full flex-grow justify-center gap-4'>
            {/* 유저 이미지 섹션 */}
            <div className='hidden rounded-lg border border-gray-200 bg-[#F8F8F8] lg:block lg:h-[120px] lg:w-[120px] xl:h-[160px] xl:w-[160px]'>
              <img
                className='rounded-lg p-1 lg:h-[120px] lg:w-[120px] xl:h-[160px] xl:w-[160px]'
                src={receivedData.user_profile_image || '/src/assets/imgs/user.png'}
                alt={receivedData.user_nickname}
              />
            </div>
            {/* 유저 데이터 섹션 */}
            <div className='space-y-2 py-2 md:flex-grow'>
              <div className='flex items-center gap-2'>
                <h2 className='text-2xl font-bold text-gray-800'>{receivedData.user_nickname}</h2>
                <Gender gender={receivedData.user_gender} birthday={null} />
                <div className='rounded-full border border-white bg-mintGreen px-2 text-sm text-white'>• 온라인</div>
              </div>
              <div className='space-y-2 text-sm text-gray-600'>
                <p className='flex items-center'>
                  <FaCalendarAlt className='text-purple-500 mr-2' />
                  신청일: {dayjs(receivedData.request_date).format('YYYY년 MM월 DD일 HH:mm')}
                </p>
                <p className='flex items-center'>
                  <FaCoins className='mr-2 text-yellow-500' />
                  가격:{' '}
                  <span className='ml-1 font-semibold text-gray-800'>
                    {(receivedData.request_price * receivedData.request_amount).toLocaleString()}원
                  </span>
                </p>
                <p className='flex items-center'>
                  <FaRedo className='mr-2 text-green-500' />
                  횟수: <span className='ml-1 font-semibold text-gray-800'>{receivedData.request_amount}회</span>
                </p>
              </div>
            </div>
          </div>

          {/* 버튼 섹션 */}
          <div className='mt-4 flex w-full justify-center md:mt-0 md:w-auto'>
            {receivedData.status ? (
              <div
                className='absolute inset-0 z-20 flex flex-col items-center justify-center rounded-xl py-4'
                style={{
                  background: 'linear-gradient(to right, rgb(74, 222, 128), rgb(31, 47, 172))',
                  opacity: 0.8,
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
                  <div className='rounded-full bg-gradient-to-r from-green-400 to-blue-500 px-6 py-2 font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105'>
                    완료
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex flex-row gap-2'>
                <button
                  type='button'
                  className='flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:bg-primary/80'
                  onClick={() =>
                    handleAcceptClick(
                      receivedData.game_request_id,
                      receivedData.request_amount,
                      receivedData.request_price
                    )
                  }
                >
                  <FaCheckCircle className='mr-2' />
                  수락하기
                </button>
                <button
                  type='button'
                  className='flex items-center rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition duration-300 ease-in-out hover:bg-gray-300'
                  onClick={() => handleCancelClick(receivedData.game_request_id)}
                >
                  <FaTimesCircle className='mr-2' />
                  거절하기
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
