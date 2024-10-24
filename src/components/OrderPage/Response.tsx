import { requestApi } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { ReceivedRequest, ReceivedRequestResponse } from '@/config/types';
import Gender from '../Common/Gender';
import OnlineFlag from '../Common/OnlineFlag';
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
      className='mt-[38px] flex h-[213px] w-full rounded-xl border border-gray-200 bg-[#FFFFFF] px-[37px] py-[25px]'
    >
      {/* 유저 이미지 */}
      <div className='min-h[160px] min-w-[160px] rounded-3xl border border-gray-200 bg-[#F8F8F8]'>
        <img
          className='h-[160px] w-[160px] p-1'
          src={receivedData.user_profile_image ? receivedData.user_profile_image : '/src/assets/imgs/user.png'}
          alt='user'
        />
      </div>

      {/* 유저 데이터 */}
      <div className='mx-8 h-[163px] w-1/2 py-2'>
        <p className='text-base'>{receivedData.user_nickname}</p>
        <div className='relative mb-[42px] mt-1 flex h-[20px] w-full items-start'>
          <Gender gender={'male'} birthday={null} />
          <div className='relative ml-[-8px] mt-[-9px] w-[100px]'>
            <OnlineFlag />
          </div>
        </div>
        <p className='mb-1'>의뢰 신청 : {new Date(receivedData.request_date).toLocaleString('ko-KR')}</p>
        <p>총 개수 : {receivedData.request_amount}</p>
      </div>

      {/* 버튼 섹션 */}
      <div className='flex flex-col justify-around'>
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
