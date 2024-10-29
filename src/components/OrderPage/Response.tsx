import { requestApi, walletApi } from '@/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReceivedRequest, ReceivedRequestResponse } from '@/config/types';
import Gender from '../Common/Gender';
import { client } from '@/api/client';
import { useUserStore } from '@/config/store';

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
      try {
        const response = await client.post(`/api/v1/game/requests/accept/${game_request_id}/`, {
          is_accept: true,
        });

        if (response.status === 200) {
          try {
            const { data: coin } = await walletApi.rechargeWalletCoin(request_price * request_amount);
            console.log('코인 추가: ', coin);
            setUser({ coin: coin.coin });

            const value: ReceivedRequestResponse | undefined = queryClient.getQueryData(['receivedOrders']);

            if (value) {
              const index = value.results.findIndex((v) => game_request_id === v.game_request_id);
              const updateResults = value.results.map((v, i) => (i === index ? { ...v, status: true } : v));
              // INFO: 캐시 업데이트, 전체 객체를 불변성을 유지하면서 업데이트
              queryClient.setQueryData(['receivedOrders'], { ...value, results: updateResults });
            }

            return data;
          } catch (err) {
            console.error(err);
          }
        }
        return null;
      } catch (err) {
        console.error(err);
        return null;
      }
    },
  });

  const handleAcceptClick = async (game_request_id: number, request_amount: number, request_price: number) => {
    aceeptMutation.mutate({ game_request_id, request_amount, request_price });
  };

  // INFO: 특정 게임 요청을 취소하고 캐시에서 해당 요청을 제거하는 mutation
  const cancelMutation = useMutation({
    mutationFn: async (game_request_id: number) => {
      try {
        const response = await client.post(`/api/v1/game/requests/accept/${game_request_id}/`, {
          is_accept: false,
        });

        if (response.status === 200) {
          const value: ReceivedRequestResponse | undefined = queryClient.getQueryData(['receivedOrders']);

          if (value) {
            const index = value.results.findIndex((v) => 30 === v.game_request_id);

            const updateResults = value.results.filter((_, i) => i !== index);

            // INFO: 캐시 업데이트, 전체 객체를 불변성을 유지하면서 업데이트
            queryClient.setQueryData(['receivedOrders'], { ...value, count: value.count - 1, results: updateResults });
          }
        }

        return data;
      } catch (err) {
        console.error(err);

        return null;
      }
    },
  });

  const handleCancelClick = async (game_request_id: number) => {
    cancelMutation.mutate(game_request_id);
  };

  return data?.results?.map((receivedData: ReceivedRequest) => (
    <div
      key={receivedData.request_date.toString()}
      className='mt-[38px] flex flex-col items-center rounded-xl border border-gray-200 bg-[#FFFFFF] p-6 md:flex-row'
    >
      {/* 유저 이미지 */}
      <div className='flex w-full flex-grow gap-4'>
        <div className='hidden rounded-lg border border-gray-200 bg-[#F8F8F8] lg:block lg:h-[120px] lg:w-[120px] xl:h-[160px] xl:w-[160px]'>
          <img
            className='rounded-lg p-1 lg:h-[120px] lg:w-[120px] xl:h-[160px] xl:w-[160px]'
            src={receivedData.user_profile_image ? receivedData.user_profile_image : '/src/assets/imgs/user.png'}
            alt='user'
          />
        </div>

        {/* 유저 데이터 */}
        <div className='flex-grow py-2'>
          <p className='text-xl font-bold'>{receivedData.user_nickname}</p>
          <div className='relative mb-2 mt-1 flex h-[20px] w-full items-start'>
            <Gender gender={receivedData.user_gender} birthday={null} />
            <div className='rounded-full border border-white bg-mintGreen px-2 text-sm text-white'>• 온라인</div>
          </div>
          <p className='mb-1'>의뢰 신청 : {new Date(receivedData.request_date).toLocaleString('ko-KR')}</p>
          <p>총 개수 : {receivedData.request_amount}</p>
        </div>
      </div>

      {/* 버튼 섹션 */}
      {receivedData.status ? (
        <div className='rounded-xl bg-primary px-3 py-2 text-[16px] font-semibold'>완료</div>
      ) : (
        <div className='flex flex-row gap-4 md:flex-col'>
          <button
            type='button'
            className='rounded-xl bg-primary px-3 py-2 text-[16px] font-semibold hover:scale-110 hover:opacity-80'
            onClick={() =>
              handleAcceptClick(receivedData.game_request_id, receivedData.request_amount, receivedData.request_price)
            }
          >
            수락하기
          </button>
          <button
            type='button'
            className='rounded-xl bg-slate-200 px-3 py-2 text-[16px] font-semibold text-gray-500 hover:scale-110 hover:opacity-80'
            onClick={() => handleCancelClick(receivedData.game_request_id)}
          >
            거절하기
          </button>
        </div>
      )}
    </div>
  ));
}
