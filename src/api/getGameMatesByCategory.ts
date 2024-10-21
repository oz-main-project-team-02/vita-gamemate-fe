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

// FIXME: API 개발 완료 시 교체만 하면됩니다.

// import { client } from './client';

// type Props = {
//   queryKey: [string, string, string, string, string, string];
//   gameId: string;
//   sortValue: string;
//   genderValue: string;
//   levelValue: string;
//   pageParam: number;
// };

// export default async function getGameMatesByCategory({ gameId, sortValue, genderValue, levelValue, pageParam }: Props) {
//   try {
//     const { data } = await client.get(`/api/v1/mates/${gameId}`, {
//       params: {
//         sort: sortValue,
//         gender: genderValue,
//         level: levelValue,
//         pageParam: pageParam,
//       },
//     });
//     return data;
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// }
