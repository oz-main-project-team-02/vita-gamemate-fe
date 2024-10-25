import { client } from './client';

export const fetchSearchUser = async (search: string) => {
  try {
    const { data } = await client.get(`/api/v1/mates/search/?page=1&search=${search}`);
    console.log(search);
    console.log(data);
  } catch (error) {
    console.error(error.response.data);
  }
};
