export interface User {
  id: number;
  nickname: string;
  email: string;
  gender: string | null;
  description: string | null;
  birthday: Date | null;
  profile_image?: string | null;
}
