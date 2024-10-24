import { requestApi } from '@/api';
import OrderBox from './OrderBox';
import { useQuery } from '@tanstack/react-query';
import { OrderRequest, OrderRequestResponse } from '@/config/types';

export default function Request() {
  const { data } = useQuery<OrderRequestResponse>({
    queryKey: ['orders'],
    queryFn: requestApi.fetchMyOrders,
  });

  return (
    <>
      {data?.results?.map((order: OrderRequest) => {
        <OrderBox review={true} order={order} />;
      })}
      <OrderBox review={true} />
    </>
  );
}
