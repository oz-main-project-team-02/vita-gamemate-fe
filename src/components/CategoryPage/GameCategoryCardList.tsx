import { UserResponse } from '@/config/types';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import MateCard from '../Common/MateCard';
import { mateApi } from '@/api';
import SkeletonMateCard from '../skeleton/SkeletonMateCard';

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

  const { data, isLoading, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery<
    UserResponse,
    Error,
    InfiniteData<UserResponse>,
    [string, string, string, string, string, string[]],
    number
  >({
    queryKey: ['user', 'mate', gameId as string, sortValue, genderValue, levelValue],
    queryFn: async ({ pageParam }) => {
      return mateApi.fetchGameMateProfiles({ gameId, sortValue, genderValue, levelValue, pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.results?.length ? allPages.length + 1 : null;
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

  return (
    <div className='w-full bg-gray-100'>
      <div
        className='mx-auto grid max-w-[1200px] justify-center gap-4 p-[20px] pt-10'
        style={{
          gridTemplateColumns: 'repeat(auto-fit, 206px)',
        }}
      >
        {isLoading
          ? Array.from({ length: 30 }).map((_, index) => <SkeletonMateCard key={index} />)
          : data?.pages?.map((page) =>
              page?.results?.map((mate) => (
                <div key={mate.id} className='mb-4'>
                  <MateCard gameId={Number(gameId)} mate={mate} />
                </div>
              ))
            )}
      </div>
      {hasNextPage && !isFetching && <div ref={ref} className='h-5 w-full bg-transparent'></div>}
    </div>
  );
}
