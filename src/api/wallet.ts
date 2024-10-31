import { client } from './client';

/**
 * GET /api/v1/wallets/coin/
 * @returns 내 지갑 코인 정보
 */
export const fetchMyWalletCoins = () => {
  return client.get('/api/v1/wallets/coin/');
};

/**
 * POST /api/v1/wallets/coin/recharge/
 * @param coin 충전할 코인
 * @returns 충전된 코인
 */
export const rechargeWalletCoin = (coin: number) => {
  return client.post('/api/v1/wallets/coin/recharge/', {
    coin,
  });
};

/**
 * POST /api/v1/wallets/coin/withdraw
 * @param coin 차감할 코인
 * @returns 차감된 코인
 */
export const withdrawWalletCoin = (coin: number) => {
  return client.post('/api/v1/wallets/coin/withdraw/', {
    coin,
  });
};
