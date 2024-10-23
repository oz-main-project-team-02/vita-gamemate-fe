import { UserProfileUpdateData } from '@/config/types';
import { client } from './client';

/**
 * GET /api/v1/users/${userId}/profile/
 * @param userId 사용자 ID
 * @returns 사용자 프로필 정보
 */
export const fetchUserProfileById = (userId: string) => {
  return client.get(`/api/v1/users/${userId}/profile/`);
};

/**
 * GET /api/v1/users/profile/me/
 * @returns 내 프로필 정보
 */
export const fetchMyProfile = () => {
  return client.get(`/api/v1/users/profile/me/`);
};

/**
 * PATCH /api/v1/users/profile/me/
 * @param data 사용자 프로필 수정 정보
 * @returns 수정된 사용자 프로필 정보
 */
export const updateMyProfile = (data: UserProfileUpdateData) => {
  return client.patch(`/api/v1/users/profile/me/`, data);
};
