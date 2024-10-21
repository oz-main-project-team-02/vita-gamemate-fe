import { client } from './client';

/**
 * @returns 내 지갑 코인 정보
 */
export async function walletCheckMyCoin() {
  return await client.get('/api/v1/wallet/coin/');
}

/**
 * @param coin 충전할 코인
 * @returns 충전된 코인
 */
export async function walletRechargeCoin(coin: number) {
  return await client.post('/api/v1/wallet/coin/recharge/', {
    coin,
  });
}
