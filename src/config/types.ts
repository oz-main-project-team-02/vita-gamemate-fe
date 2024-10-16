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
