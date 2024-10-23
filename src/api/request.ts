import { client } from './client';

interface RequestData {
  game_id: number | undefined;
  price: number;
  amount: number;
}

/**
 * POST /api/v1/game/requests/${userId}
 * @param mateId 상대방 ID
 * @param value 요청 데이터 { game_id, price, amount }
 * @returns 게임 메이트 요청
 */
export const sendMateRequest = async (mateId: number, { game_id, price, amount }: RequestData) => {
  try {
    const { data }: { data: RequestData } = await client.post(`/api/v1/game/requests/${mateId}`, {
      game_id,
      price,
      amount,
    });

    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const MateRequest = (mateId: number, { game_id, price, amount }: RequestData) => {
  return client.post(`/api/v1/game/requests/${mateId}`, {
    game_id,
    price,
    amount,
  });
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
