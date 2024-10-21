import { client } from './client';

interface UserMateRegisterData {
  game_id: number;
  level: string;
  description: string;
  image: string;
  request_price: number;
}

/**
 * @param data 사용자 메이트 등록 정보
 * @returns 등록된 사용자 메이트 정보
 */
export async function mateRegister(data: UserMateRegisterData) {
  return await client.post(`/api/v1/users/mate/register/`, data);
}

/**
 * @param GameId 게임 ID
 * @param params 쿼리스트링 {sort, gender, level, pageParam}
 * @returns 게임 ID에 해당하는 메이트 프로필들
 */
export async function mateProfileByGameId(GameId: string, params: unknown) {
  return await client.get(`/api/v1/mates/${GameId}/`, {
    params: {
      params,
    },
  });
}

/**
 * @param params 쿼리스트링 {sort, gender, level, pageParam}
 * @returns 모든 카테고리의 메이트 프로필들
 */
export async function mateProfileAllCategory(params: unknown) {
  return await client.get(`/api/v1/mates/`, {
    params: {
      params,
    },
  });
}
