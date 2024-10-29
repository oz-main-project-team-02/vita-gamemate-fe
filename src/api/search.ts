import { client } from './client';

export const fetchSearchUser = (search: string) => {
  return client.get(`/api/v1/mates/search/?search=${search}`);
};
