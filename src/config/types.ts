export interface User {
  id: number;
  nickname: string;
  email: string;
  gender: string | null;
  description: string | null;
  birthday: string | null;
  profile_image?: string | null;
  is_mate: boolean;
  is_onlien: boolean;
}

export interface GameMate {
  id: number;
  nickname: string;
  email: string;
  gender: string | null;
  description: string | null;
  birthday: string | null;
  profile_image?: string | null;
  is_online: boolean;
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
