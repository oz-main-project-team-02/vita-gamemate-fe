// TODO: API 명세서가 나오면 데이터 타입을 새로 지정할 필요가 있음.
// WARNING: 기존 type * = { [key]: [string] } Response의 불확실으로 에러날 확률이 100%
export interface User {
  id: number;
  nickname: string | null;
  email: string | null;
  gender: string | null;
  profile_image: string | null;
  birthday: string | null;
  description: string | null;
  social_provider: string | null;
  is_online: boolean;
  is_mate: boolean;
  coin: number;
}

export interface MateUser {
  user_nickname: string;
  user_gender: string | null;
  user_profile_image: string | null;
  user_description: string | null;
  game_id: number;
  description: string | null;
  image: string;
  level: string;
  coin_price: number;
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

export type Wallet = {
  user_id: number;
  coin: number;
};
