import { client } from './client';

/**
 * @param userId 사용자 ID
 * @returns 사용자 프로필 정보
 */
export async function userProfileById(userId: string) {
  return await client.get(`/api/v1/users/${userId}/profile/`);
}

/**
 * @returns 내 프로필 정보
 */
export async function userMyProfile() {
  return await client.get(`/api/v1/users/profile/me/`);
}

interface UserProfileUpdateData {
  nickname?: string;
  gender?: string;
  profile_image?: string;
  birthdata?: string;
  description?: string;
}

/**
 * @param data 사용자 프로필 수정 정보
 * @returns 수정된 사용자 프로필 정보
 */
export async function userUpdateProfile(data: UserProfileUpdateData) {
  return await client.patch(`/api/v1/users/profile/me/`, data);
}
