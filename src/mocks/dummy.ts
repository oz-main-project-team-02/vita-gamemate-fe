import { ChatList, ChatMessage } from '../config/types';

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
    last_message_time: new Date('2024-10-20 14:05:00'),
  },
];

export const dummyChatMessage: ChatMessage = {
  chat_room_id: 1,
  participants: [
    {
      user_id: 2,
      nickname: '게임왕',
      profile_image: 'https://picsum.photos/100/100?random=3',
    },
    {
      user_id: 1,
      nickname: '전설의고수',
      profile_image: null,
    },
  ],
  messages: [
    {
      message_id: 1,
      user_id: 2,
      message: '내일 저녁에 게임 가능?',
      created_at: new Date('2024-10-19 20:00:10'),
      profile_image: 'https://picsum.photos/100/100?random=3',
    },
    {
      message_id: 2,
      user_id: 2,
      message:
        '이번에 새로운 전략을 시도해볼까 생각 중이야. 조금 더 수비적으로 가면서 상대방이 지칠 때까지 기다렸다가 카운터를 치는 게 어떨까? 그리고 새로운 무기 조합도 생각해봤는데, 네가 저번에 추천한 아이템을 써보는 것도 좋을 것 같아. 네 의견은 어때?',
      created_at: new Date('2024-10-19 20:01:30'),
      profile_image: 'https://picsum.photos/100/100?random=3',
    },
    {
      message_id: 3,
      user_id: 1,
      message:
        '그 전략 나쁘지 않은 것 같아! 초반에 너무 무리하는 것보다는 안정적으로 가면서 상대방의 실수를 기다리는 게 더 나을지도 몰라',
      created_at: new Date('2024-10-19 20:02:50'),
      profile_image: null,
    },
    {
      message_id: 4,
      user_id: 1,
      message:
        '그리고 내가 추천한 아이템, 확실히 초반 방어력에서는 탁월하니까 우리 전략에 잘 맞을 거야. 근데, 중반 이후에도 그 아이템이 유효할지 고민이야. 중반에는 좀 더 공격적인 장비로 교체하는 게 좋을지도 몰라',
      created_at: new Date('2024-10-19 20:03:30'),
      profile_image: null,
    },
    {
      message_id: 5,
      user_id: 1,
      message: '어떻게 생각해?',
      created_at: new Date('2024-10-19 20:03:40'),
      profile_image: null,
    },
    {
      message_id: 6,
      user_id: 2,
      message:
        '중반에 교체하는 건 좋은 생각이야. 초반에는 방어 중심으로 가고, 중반부터는 공격적으로 전환하는 방식으로 가보자',
      created_at: new Date('2024-10-20 10:02:00'),
      profile_image: 'https://picsum.photos/100/100?random=3',
    },
    {
      message_id: 7,
      user_id: 2,
      message: '그럼, 오늘 저녁에 8시쯤 만날까? 나도 좀 더 연구해볼 테니 그때 다시 이야기하자',
      created_at: new Date('2024-10-20 10:02:50'),
      profile_image: 'https://picsum.photos/100/100?random=3',
    },
    {
      message_id: 8,
      user_id: 1,
      message: '그래. 이따 8시에 봐!',
      created_at: new Date('2024-10-20 14:05:00'),
      profile_image: null,
    },
  ],
};
