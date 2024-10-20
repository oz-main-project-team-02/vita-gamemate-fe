// TODO: API 명세서가 나오면 데이터 타입을 새로 지정할 필요가 있음.
// WARNING: 기존 type * = { [key]: [string] } Response의 불확실으로 에러날 확률이 100%
export interface User {
  id: number;
  nickname: string | null;
  email: string | null;
  gender: string | null;
  description: string | null;
  birthday: string | null;
  profile_image?: string | null;
  is_mate: boolean;
  is_online: boolean;
}

export interface GameMate extends User {
  game_id: number;
  level: string;
  price: number;
  average_rating?: number;
  amount: number;
}

export interface Review {
  id: string;
  request_id: string;
  rating: number;
  content: string;
  created_at: Date;
}

export type MateRegister = {
  game_id: string | null;
  level: string | null;
  description: string | null;
  image: string | null;
  request_price: number | null;
};

export interface ChatList {
  chat_room_id: number;
  profile_image: string | null;
  nickname: string;
  last_message: string;
  last_message_time: Date;
}

export interface Participant {
  user_id: number;
  nickname: string;
  profile_image: string | null;
}

export interface Message {
  message_id: number;
  user_id: number;
  message: string;
  created_at: Date;
  profile_image: string | null;
}

export interface ChatMessage {
  chat_room_id: number;
  participants: Participant[];
  messages: Message[];
}
