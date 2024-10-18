import axios from 'axios';

type Props = {
  pageParam?: number;
  queryKey: [string, string, string];
};

export default async function getGameMatesByCategory({ pageParam, queryKey }: Props) {
  const [, , gameId] = queryKey;
  try {
    const { data } = await axios.get(`/api/v1/users/${gameId}/mate?cursor=${pageParam}`);
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}
