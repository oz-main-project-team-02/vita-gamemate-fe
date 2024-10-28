import { requestApi } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { ReceivedRequest, ReceivedRequestResponse } from '@/config/types';
import Gender from '../Common/Gender';
import { client } from '@/api/client';

export default function Response() {
  const { data } = useQuery<ReceivedRequestResponse>({
    queryKey: ['receivedOrders'],
    queryFn: requestApi.fetchReceivedOrders,
  });

  const handleAcceptClick = async (game_request_id: number) => {
    try {
      const { data } = await client.post(`/api/v1/game/requests/accecpt/${game_request_id}/`);
      console.log('의뢰 수락: ', data);

      return data;
    } catch (err) {
      console.error(err);

      return null;
    }
  };

  const handleCancelClick = async (game_request_id: number) => {
    try {
      // FIXME: API 수정 필요
      const { data } = await client.post(`/api/v1/game/requests/cancel/${game_request_id}/`);
      console.log('의뢰 취소: ', data);
      return data;
    } catch (err) {
      console.error(err);

      return null;
    }
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
      <div className='flex flex-row gap-4 md:flex-col'>
        <button
          type='button'
          className='rounded-xl bg-primary px-3 py-2 text-[16px] font-semibold hover:scale-110 hover:opacity-80'
          onClick={() => handleAcceptClick(receivedData.game_request_id)}
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
    </div>
  ));
}
