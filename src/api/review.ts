import { Review } from '@/config/types';
import { client } from './client';

/**
 * GET /api/v1/users/reviews
 * @returns 실시간 생생후기
 */
export const fetchReviews = async () => {
  try {
    const { data } = await client.get(`/api/v1/reviews`);
    return data;
  } catch (err) {
    console.error(err);
  }
};

/**
 * GET /api/v1/reviews/${userId}/
 * @param userId 사용자 ID
 * @param page 페이지 번호
 * @returns 사용자 ID에 해당하는 리뷰 목록
 */
export const fetchReviewsById = async (userId: string, page: number) => {
  try {
    const { data }: { data: Review[] } = await client.get(`/api/v1/reviews/${userId}/`, {
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

interface ReviewData {
  rating: number;
  content: string;
}

/**
 * POST /api/v1/reviews/${gameRequestId}/write/
 * @param id 게임 메이트 ID
 * @param reviewData 리뷰 데이터
 * @returns 리뷰 등록 정보 { rating, content, game_request }
 */
export const fetchPostReview = (id: number, reviewData: ReviewData) => {
  return client.post(`/api/v1/reviews/${id}/write/`, reviewData);
};

export const fetchReviewsByGameId = async (userId: string, gameId: string, page: number) => {
  try {
    const { data } = await client.get(`/api/v1/reviews/${userId}/${gameId}`, {
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
