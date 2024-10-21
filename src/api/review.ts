import { Review } from '@/config/types';
import { client } from './client';

/**
 * GET /api/v1/users/reviews
 * @returns 실시간 생생후기
 */
export const fetchReviews = async (): Promise<Review[]> => {
  try {
    const { data } = await client.get(`/api/v1/users/reviews`);
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

/**
 * GET /api/v1/reviews/${userId}/
 * @param userId 사용자 ID
 * @param page 페이지 번호
 * @returns 사용자 ID에 해당하는 리뷰 목록
 */
export const fetchReviewsById = async (userId: string, page: number): Promise<Review[]> => {
  try {
    const { data } = await client.get(`/api/v1/reviews/${userId}/`, {
      params: {
        page,
      },
    });
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
