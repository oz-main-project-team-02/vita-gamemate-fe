import { getGame } from '@/config/const';
import { UserResponse } from '@/config/types';
import ErrorPage from '@/pages/ErrorPage';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import MateCard from '../Common/MateCard';
import Spinner from '../Common/Spinner';
import { mateApi } from '@/api';

type Props = {
  gameId: string | undefined;
  sortValue: string;
  genderValue: string;
  levelValue: string[];
};

export default function GameCategoryCardList({ gameId, sortValue, genderValue, levelValue }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (gameId) {
      return;
    }
    navigate('/', { replace: true });
  }, [gameId, navigate]);

  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery<
    UserResponse,
    Error,
    InfiniteData<UserResponse>,
    [string, string, string, string, string, string[]],
    number
  >({
    queryKey: ['user', 'mate', gameId as string, sortValue, genderValue, levelValue],
    queryFn: ({ pageParam }) =>
      mateApi.fetchGameMateProfiles({ gameId, sortValue, genderValue, levelValue, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log('lastPage 데이터:', lastPage);

      if (!lastPage?.results?.length) {
        return;
      }

      const nextPage = allPages.length + 1;
      return nextPage;
    },
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  if (!getGame(Number(gameId))) {
    return <ErrorPage />;
  }

  return (
    <div
      className='flex flex-col items-center justify-center bg-gray-100 py-11'
      style={{ width: `calc(100% - 200px)` }}
    >
      <div className='flex max-w-[1120px] flex-wrap gap-[10px] p-[20px]'>
        {data?.pages?.map((page) =>
          page?.results?.map((mate) => (
            <div key={mate.id} className='mb-4'>
              <MateCard mate={mate} />
            </div>
          ))
        )}
      </div>
      {isFetching ? <Spinner /> : null}
      <div ref={ref} className='h-5 w-full bg-transparent'></div>
    </div>
  );
}
