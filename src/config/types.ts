export type User = {
  id: number;
  nickname: string;
  email: string;
  gender: string | null;
  description: string | null;
  birthday: string | null;
  profile_image?: string | null;
  is_mate: boolean;
  is_online: boolean;
};

export type GameMate = User & {
  game_id: number;
  level: string;
  price: number;
  average_rating?: number;
  amount: number;
};

export type Review = {
  id: string;
  request_id: string;
  rating: number;
  content: string;
  created_at: Date;
};
