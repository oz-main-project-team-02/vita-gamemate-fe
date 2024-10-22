import { mock } from './mock';

type Props = {
  pageParam?: number;
  queryKey: [string, string, string];
};

export default async function getGameMatesByCategory({ pageParam, queryKey }: Props) {
  const [, , gameId] = queryKey;
  try {
    const { data } = await mock.get(`/api/v1/users/${gameId}/mate?cursor=${pageParam}`);
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}
