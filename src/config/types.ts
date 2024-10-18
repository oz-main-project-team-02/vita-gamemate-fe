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

export interface ChatList {
    chat_room_id: number;
    profile_image: string | null;
    nickname: string;
    last_message: string;
    last_message_time: Date;
}

interface Participant {
    user_id: number;
    nickname: string;
    profile_image: string | null;
}

interface Message {
    message_id: number;
    user_id: number;
    message: string;
    created_at: Date;
}

export interface ChatMessage {
    chat_room_id: number;
    participants: Participant[];
    messages: Message[];
}
