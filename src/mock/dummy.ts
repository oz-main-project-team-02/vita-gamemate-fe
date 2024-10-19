import { ChatList, ChatMessage, GameMate, Review } from '../config/types';

export const dummyGameMates: GameMate[] = [
  {
    id: 1,
    nickname: 'Summoner123',
    email: 'summoner123@example.com',
    gender: 'male',
    description: '즐겁게 게임할 파트너를 찾고 있습니다.',
    birthday: '1995-08-15',
    profile_image: 'https://picsum.photos/200/300?random=1',
    is_online: true,
    game_id: 1,
    level: 'Diamond',
    price: 9999,
    average_rating: 4,
    amount: 500,
  },
  {
    id: 2,
    nickname: 'GameMaster456',
    email: 'gamemaster456@example.com',
    gender: 'female',
    description: '팀플레이에 자신 있습니다. 함께 게임해요!',
    birthday: '1998-03-22',
    profile_image: 'https://picsum.photos/200/300?random=2',
    is_online: false,
    game_id: 2,
    level: 'Platinum',
    price: 50,
    average_rating: 4,
    amount: 5,
  },
  {
    id: 3,
    nickname: 'AcePlayer789',
    email: 'aceplayer789@example.com',
    gender: null,
    description: null,
    birthday: null,
    profile_image: 'https://picsum.photos/200/300?random=3',
    is_online: true,
    game_id: 3,
    level: 'Gold',
    price: 333,
    average_rating: 4,
    amount: 10,
  },
  {
    id: 4,
    nickname: 'ProGamer999',
    email: 'progamer999@example.com',
    gender: 'male',
    description: '최고의 실력을 보여드리겠습니다.',
    birthday: '1992-07-30',
    profile_image: 'https://picsum.photos/200/300?random=4',
    is_online: false,
    game_id: 4,
    level: 'Master',
    price: 1111,
    average_rating: 4,
    amount: 100,
  },
];

export const dummyReviews: Review[] = [
  {
    id: '1',
    request_id: 'Summoner123', // 의뢰자 아이디
    rating: 5,
    content: '정말 최고의 게임 메이트였습니다! 추천합니다.',
    created_at: new Date('2024-10-01'),
  },
  {
    id: '2',
    request_id: 'GameMaster456', // 의뢰자 아이디
    rating: 4,
    content: '전반적으로 좋았지만, 약간의 의사소통 문제가 있었어요.',
    created_at: new Date('2024-10-02'),
  },
  {
    id: '3',
    request_id: 'AcePlayer789', // 의뢰자 아이디
    rating: 3,
    content: '괜찮았지만 기대에 미치지 못했습니다.',
    created_at: new Date('2024-10-03'),
  },
  {
    id: '4',
    request_id: 'ProGamer999', // 의뢰자 아이디
    rating: 5,
    content: '매우 유능한 파트너! 다시 함께 하고 싶어요.',
    created_at: new Date('2024-10-04'),
  },
  {
    id: '5',
    request_id: 'GameNerd123', // 의뢰자 아이디
    rating: 2,
    content: '기대했던 것보다 많이 아쉬웠습니다.',
    created_at: new Date('2024-10-05'),
  },
];

export const dummyChatLists: ChatList[] = [
  {
    chat_room_id: 1,
    profile_image: null,
    nickname: 'PlayerOne',
    last_message: 'Are you ready for the game?',
    last_message_time: new Date('2024-10-08 10:01:00'),
  },
  {
    chat_room_id: 2,
    profile_image: 'https://picsum.photos/100/100?random=1',
    nickname: 'GamerPro',
    last_message: "Let's meet in the lobby. Let's meet in the lobby. Let's meet in the lobby.",
    last_message_time: new Date('2024-10-17 11:15:00'),
  },
  {
    chat_room_id: 3,
    profile_image: 'https://picsum.photos/100/100?random=2',
    nickname: 'NoobMaster',
    last_message: "I just joined, what's next?",
    last_message_time: new Date('2024-10-18 12:30:00'),
  },
  {
    chat_room_id: 4,
    profile_image: 'https://picsum.photos/100/100?random=3',
    nickname: '게임왕',
    last_message: '오늘 저녁에 게임 가능?',
    last_message_time: new Date('2024-10-18 13:05:00'),
  },
  {
    chat_room_id: 5,
    profile_image: 'https://picsum.photos/100/100?random=4',
    nickname: '초보자',
    last_message: '지금 시작할 수 있나요?',
    last_message_time: new Date('2024-10-19 10:30:00'),
  },
  {
    chat_room_id: 6,
    profile_image: null,
    nickname: '전설의고수',
    last_message: '그래. 이따 8시에 봐!',
    last_message_time: new Date('2024-10-19 20:05:00'),
  },
];

export const dummyChatMessage: ChatMessage = {
  chat_room_id: 1,
  participants: [
    {
      user_id: 0,
      nickname: '게임왕',
      profile_image: 'https://picsum.photos/100/100?random=3',
    },
    {
      user_id: 102,
      nickname: '전설의고수',
      profile_image: null,
    },
  ],
  messages: [
    {
      message_id: 1,
      user_id: 0,
      message: '오늘 저녁에 게임 가능?',
      created_at: new Date('2024-10-19 20:00:00'),
      profile_image: 'https://picsum.photos/100/100?random=3',
    },
    {
      message_id: 2,
      user_id: 0,
      message:
        '이번에 새로운 전략을 시도해볼까 생각 중이야. 예전에는 초반에 너무 공격적으로 가다가 오히려 뒤에서 당했잖아. 이번에는 조금 더 수비적으로 가면서 상대방이 지칠 때까지 기다렸다가 카운터를 치는 게 어떨까? 그리고 새로운 무기 조합도 생각해봤는데, 네가 저번에 추천한 아이템을 써보는 것도 좋을 것 같아. 네 의견은 어때?',
      created_at: new Date('2024-10-19 20:00:30'),
      profile_image: 'https://picsum.photos/100/100?random=3',
    },
    {
      message_id: 3,
      user_id: 102,
      message:
        '그 전략 나쁘지 않은 것 같아! 초반에 너무 무리하는 것보다는 안정적으로 가면서 상대방의 실수를 기다리는 게 더 나을지도 몰라',
      created_at: new Date('2024-10-19 20:01:00'),
      profile_image: null,
    },
    {
      message_id: 4,
      user_id: 102,
      message:
        '그리고 내가 추천한 아이템, 확실히 초반 방어력에서는 탁월하니까 우리 전략에 잘 맞을 거야. 근데, 중반 이후에도 그 아이템이 유효할지 고민이야. 중반에는 좀 더 공격적인 장비로 교체하는 게 좋을지도 몰라. 어떻게 생각해?',
      created_at: new Date('2024-10-19 20:01:30'),
      profile_image: null,
    },
    {
      message_id: 5,
      user_id: 0,
      message:
        '중반에 교체하는 건 좋은 생각이야. 초반에는 방어 중심으로 가고, 중반부터는 공격적으로 전환하는 방식으로 가보자',
      created_at: new Date('2024-10-19 20:02:00'),
      profile_image: 'https://picsum.photos/100/100?random=3',
    },
    {
      message_id: 6,
      user_id: 0,
      message: '그럼, 오늘 저녁에 8시쯤 만날까? 나도 좀 더 연구해볼 테니 그때 다시 이야기하자',
      created_at: new Date('2024-10-19 20:02:30'),
      profile_image: 'https://picsum.photos/100/100?random=3',
    },
    {
      message_id: 7,
      user_id: 102,
      message: '그래. 이따 8시에 봐!',
      created_at: new Date('2024-10-19 20:05:00'),
      profile_image: null,
    },
  ],
};
