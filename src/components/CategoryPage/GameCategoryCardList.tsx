import { UserResponse } from '@/config/types';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import MateCard from '../Common/MateCard';
import { mateApi } from '@/api';
import SkeletonMateCard from '../skeleton/SkeletonMateCard';
import { delay } from '@/utils/delay';

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
      // FIXME: 실제 서비스에서는 delay 함수를 사용하지 않습니다.
      // FIXME: delay 함수 제거시 async await 구문 제거
      await delay(5000);
      return mateApi.fetchGameMateProfiles({ gameId, sortValue, genderValue, levelValue, pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log('lastPage 데이터:', lastPage);

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
    <div
      className='flex flex-col items-center justify-center bg-gray-100 py-11'
      style={{ width: `calc(100% - 200px)` }}
    >
      <div className='flex max-w-[1120px] flex-wrap gap-[10px] p-[20px]'>
        {isLoading
          ? Array.from({ length: 30 }).map((_, index) => <SkeletonMateCard key={index} />)
          : data?.pages?.map((page) =>
              page?.results?.map((mate) => (
                <div key={mate.id} className='mb-4'>
                  <MateCard mate={mate} />
                </div>
              ))
            )}
      </div>
      {hasNextPage && !isFetching && <div ref={ref} className='h-5 w-full bg-transparent'></div>}
    </div>
  );
}
