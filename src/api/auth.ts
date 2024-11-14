import { client } from './client';

/**
 * POST /api/v1/users/kakao/login/callback/
 * @param kakaoCode 카카오 로그인 인가코드
 * @returns 카카오 로그인 유저정보
 */
export const kakaoLogin = (kakaoCode: string | null) => {
  return client.post('/api/v1/users/kakao/login/callback/', {
    code: kakaoCode,
  });
};

/**
 * POST /api/v1/users/google/login/callback/
 * @param googleCode 구글 로그인 인가코드
 * @returns 구글 로그인 유저정보
 */
export const googleLogin = (googleCode: string | null) => {
  return client.post('/api/v1/users/google/login/callback/', {
    code: googleCode,
  });
};

/**
 * GET /api/v1/users/auth/accesstoken/
 * @returns accessToken 재발급
 */
export const refreshToken = () => {
  return client.get('/api/v1/users/auth/accesstoken/');
};

/**
 * POST /api/v1/users/auth/logout/
 * @returns 로그아웃: refresh_token 무효화
 */
export const logout = () => {
  return client.post('/api/v1/users/auth/logout/');
};

//
