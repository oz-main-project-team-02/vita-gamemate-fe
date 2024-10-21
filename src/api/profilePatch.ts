import { User } from '@/config/types';
import { client } from './client';

export const profilePatch = async (data: User) => {
  const response = await client.patch('/api/v1/users/profile/me/', {
    data,
  });
  console.log(response);
};
