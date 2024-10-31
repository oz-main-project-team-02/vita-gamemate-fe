import { client } from './client';

interface RequestData {
  game_id: number | undefined;
  price: number;
  amount: number;
}

export const MateRequest = (mateId: number, { game_id, price, amount }: RequestData) => {
  return client.post(`/api/v1/game/requests/${mateId}/`, {
    game_id,
    price,
    amount,
  });
};

export const updateRequestStatus = (game_request_id: number, is_accept: boolean) => {
  return client.post(`/api/v1/game/requests/accept/${game_request_id}/`, {
    is_accept,
  });
};

export const cancelRequest = (game_request_id: number) => {
  return client.post(`/api/v1/game/requests/cancel/${game_request_id}/`, {});
};

/**
 * GET /api/v1/game/requests/ordered
 * @returns 나의 주문 목록
 */
export const fetchMyOrders = async () => {
  try {
    const { data } = await client.get(`/api/v1/game/requests/ordered`);

    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

/**
 * GET /api/v1/game/requests/received
 * @returns 받은 주문 목록
 */
export const fetchReceivedOrders = async () => {
  try {
    const { data } = await client.get(`/api/v1/game/requests/received`);

    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
