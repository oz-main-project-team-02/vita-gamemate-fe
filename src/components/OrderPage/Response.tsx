import { requestApi } from '@/api';
import { useQuery } from '@tanstack/react-query';
import OrderBox from './OrderBox';
import { ReceivedRequest, ReceivedRequestResponse } from '@/config/types';

export default function Response() {
  const { data } = useQuery<ReceivedRequestResponse>({
    queryKey: ['receivedOrders'],
    queryFn: requestApi.fetchReceivedOrders,
  });

  return (
    <>
      {data?.results?.map((received: ReceivedRequest) => {
        <OrderBox review={false} received={received} />;
      })}
    </>
  );
}
