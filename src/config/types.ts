export interface MateGameInfo {
  description: string;
  game_id: number;
  image: string;
  level: string;
  request_price: number;
  average_rating: number;
  review_count: number;
}

export interface User {
  birthday: string | null;
  description: string | null;
  email: string | null;
  gender: string | null;
  id: number;
  is_mate: boolean;
  is_online: boolean;
  mate_game_info?: MateGameInfo[]; // mate_game_info 배열
  nickname: string | null;
  profile_image: string | null;
  social_provider: string | null;
  coin: number;
  average_rating: number;
  amount: number;
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

export interface Review {
  game_request_id: string;
  rating: number;
  content: string;
  created_at: Date;
}

export interface ReviewPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: Review[];
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

export interface ChatList {
  id: number;
  main_user_nickname: string;
  other_user_id: number;
  other_user_nickname: string;
  other_user_profile_image: string | null;
  latest_message: string | null;
  latest_message_time: Date | null;
  updated_at: Date;
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
  id: number;
  participants: Participant[];
  messages: Message[] | null;
}

export interface UserResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
}

export interface OrderRequest {
  game_request_id: number;
  mate_nickname: string;
  mate_id: number;
  mate_profile_image: string | null;
  mate_gender: string | null;
  mate_online: boolean;
  status: boolean;
  request_date: Date;
  request_amount: number;
  request_price: number;
}

export interface OrderRequestResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: OrderRequest[];
}

export interface ReceivedRequest {
  game_request_id: number;
  user_nickname: string;
  user_profile_image: string | null;
  user_gender: string | null;
  user_online: boolean;
  user_id: number;
  status: boolean;
  request_date: Date;
  request_amount: number;
  request_price: number;
}

export interface ReceivedRequestResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ReceivedRequest[];
}

export interface UserProfileUpdateData {
  nickname: string;
  gender?: string | null;
  profile_image?: string | null;
  birthday?: string | null;
  description?: string | null;
}
