import { GameMate, Review } from "../config/types";

export const dummyGameMates: GameMate[] = [
  {
    id: 1,
    nickname: "Summoner123",
    email: "summoner123@example.com",
    gender: "male",
    description: "즐겁게 게임할 파트너를 찾고 있습니다.",
    birthday: "1995-08-15",
    profile_image: "https://picsum.photos/200/300?random=1",
    is_onlien: true,
    game_id: 1,
    level: "Diamond",
    price: 9999,
    average_rating: 4,
    amount: 500,
  },
  {
    id: 2,
    nickname: "GameMaster456",
    email: "gamemaster456@example.com",
    gender: "female",
    description: "팀플레이에 자신 있습니다. 함께 게임해요!",
    birthday: "1998-03-22",
    profile_image: "https://picsum.photos/200/300?random=2",
    is_onlien: false,
    game_id: 2,
    level: "Platinum",
    price: 50,
    average_rating: 4,
    amount: 5,
  },
  {
    id: 3,
    nickname: "AcePlayer789",
    email: "aceplayer789@example.com",
    gender: null,
    description: null,
    birthday: null,
    profile_image: "https://picsum.photos/200/300?random=3",
    is_onlien: true,
    game_id: 3,
    level: "Gold",
    price: 333,
    average_rating: 4,
    amount: 10,
  },
  {
    id: 4,
    nickname: "ProGamer999",
    email: "progamer999@example.com",
    gender: "male",
    description: "최고의 실력을 보여드리겠습니다.",
    birthday: "1992-07-30",
    profile_image: "https://picsum.photos/200/300?random=4",
    is_onlien: false,
    game_id: 4,
    level: "Master",
    price: 1111,
    average_rating: 4,
    amount: 100,
  },
];

export const dummyReviews: Review[] = [
  {
    id: "1",
    request_id: "Summoner123", // 의뢰자 아이디
    rating: 5,
    content: "정말 최고의 게임 메이트였습니다! 추천합니다.",
    created_at: new Date("2024-10-01"),
  },
  {
    id: "2",
    request_id: "GameMaster456", // 의뢰자 아이디
    rating: 4,
    content: "전반적으로 좋았지만, 약간의 의사소통 문제가 있었어요.",
    created_at: new Date("2024-10-02"),
  },
  {
    id: "3",
    request_id: "AcePlayer789", // 의뢰자 아이디
    rating: 3,
    content: "괜찮았지만 기대에 미치지 못했습니다.",
    created_at: new Date("2024-10-03"),
  },
  {
    id: "4",
    request_id: "ProGamer999", // 의뢰자 아이디
    rating: 5,
    content: "매우 유능한 파트너! 다시 함께 하고 싶어요.",
    created_at: new Date("2024-10-04"),
  },
  {
    id: "5",
    request_id: "GameNerd123", // 의뢰자 아이디
    rating: 2,
    content: "기대했던 것보다 많이 아쉬웠습니다.",
    created_at: new Date("2024-10-05"),
  },
];
