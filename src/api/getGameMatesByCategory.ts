import { client } from './client';

export default async function getGameMatesByCategory(gameId: number) {
  const response = await client.get(`/api/v1/mates/${gameId.toString()}`);
}
