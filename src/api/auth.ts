import { client } from './client';

/**
 * @param kakaoCode 카카오 로그인 인가코드
 * @returns 카카오 로그인 유저정보
 */
export const authKakaoLogin = (kakaoCode: string | null) => {
  return client.post('/api/v1/users/kakao/login/callback/', {
    code: kakaoCode,
  });
};

/**
 * @param googleCode 구글 로그인 인가코드
 * @returns 구글 로그인 유저정보
 */
export const authGoogleLogin = (googleCode: string | null) => {
  return client.post('/api/v1/users/google/login/callback/', {
    code: googleCode,
  });
};

/**
 * @returns accessToken 재발급
 */
export const authRefreshToken = () => {
  return client.get('/api/v1/users/auth/accesstoken/');
};

/**
 * @returns 로그아웃: refresh_token 무효화
 */
export const authLogout = () => {
  return client.post('/api/v1/users/auth/logout/');
};
