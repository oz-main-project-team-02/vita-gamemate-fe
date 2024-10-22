import { client } from './client';

/**
 * GET /api/v1/wallets/coin/
 * @returns 내 지갑 코인 정보
 */
export const walletCheckMyCoin = () => {
  return client.get('/api/v1/wallets/coin/');
};

/**
 * POST /api/v1/wallets/coin/recharge/
 * @param coin 충전할 코인
 * @returns 충전된 코인
 */
export const walletRechargeCoin = (coin: number) => {
  return client.post('/api/v1/wallets/coin/recharge/', {
    coin,
  });
};
