import { http, HttpResponse } from 'msw';
import { Review } from '../config/types';
import { dummyChatLists, dummyChatMessage } from './dummy';

const reviewData: Review[] = [
  {
    game_request_id: 'Summoner123', // 의뢰자 아이디
    rating: 5,
    content: '정말 최고의 게임 메이트였습니다! 추천합니다.',
    created_at: new Date('2024-10-01'),
  },
  {
    game_request_id: 'GameMaster456', // 의뢰자 아이디
    rating: 4,
    content: '전반적으로 좋았지만, 약간의 의사소통 문제가 있었어요.',
    created_at: new Date('2024-10-02'),
  },
  {
    game_request_id: 'AcePlayer789', // 의뢰자 아이디
    rating: 3,
    content: '괜찮았지만 기대에 미치지 못했습니다.',
    created_at: new Date('2024-10-03'),
  },
  {
    game_request_id: 'ProGamer999', // 의뢰자 아이디
    rating: 5,
    content: '매우 유능한 파트너! 다시 함께 하고 싶어요.',
    created_at: new Date('2024-10-04'),
  },
  {
    game_request_id: 'GameNerd123', // 의뢰자 아이디
    rating: 2,
    content: '기대했던 것보다 많이 아쉬웠습니다.',
    created_at: new Date('2024-10-05'),
  },
];

export const handlers = [
  // 최신 리뷰 데이터 요청
  http.get(`/api/v1/users/review`, () => {
    return HttpResponse.json(reviewData);
  }),

  // 채팅 전체 목록 조회
  http.get('/api/v1/chats/rooms/', () => {
    return HttpResponse.json(dummyChatLists);
  }),
  // 채팅 내역 상세 조회
  http.get(`/api/v1/chats/:roomId/messages`, () => {
    return HttpResponse.json(dummyChatMessage);
  }),
  // 채팅 메세지 전송
  http.post(`/api/v1/chats/:roomId/messages`, () => {
    return HttpResponse.json({ message: '메세지가 전송되었습니다.' }, { status: 200 });
  }),
  // 채팅방 생성
  http.post('/api/v1/chats/create/', () => {
    return HttpResponse.json({ message: '채팅방이 생성되었습니다.' }, { status: 201 });
  }),
];
