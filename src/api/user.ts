import { client } from './client';

/**
 * /api/v1/users/${userId}/profile/
 * @param userId 사용자 ID
 * @returns 사용자 프로필 정보
 */
export const userProfileById = (userId: string) => {
  return client.get(`/api/v1/users/${userId}/profile/`);
};

/**
 * /api/v1/users/profile/me/
 * @returns 내 프로필 정보
 */
export const userMyProfile = () => {
  return client.get(`/api/v1/users/profile/me/`);
};

interface UserProfileUpdateData {
  nickname?: string;
  gender?: string;
  profile_image?: string;
  birthdata?: string;
  description?: string;
}
/**
 * /api/v1/users/profile/me/
 * @param data 사용자 프로필 수정 정보
 * @returns 수정된 사용자 프로필 정보
 */
export const userUpdateProfile = (data: UserProfileUpdateData) => {
  return client.patch(`/api/v1/users/profile/me/`, data);
};
