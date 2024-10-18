import { useEffect, useState } from 'react';
import TitleIntro from '../components/Common/TitleIntro';
import CommonLayout from '../layouts/CommonLayout';
import MateCard from '../components/Common/MateCard';
import { useNavigate, useParams } from 'react-router-dom';
import { getGame } from '../config/const';
import ErrorPage from './ErrorPage';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import getGameMatesByCategory from '@/api/getGameMatesByCategory';
import { GameMate } from '@/config/types';
import { useInView } from 'react-intersection-observer';
import Spinner from '@/components/Common/Spinner';

export default function CategoryPage() {
  const [sort, setSort] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const { gameId } = useParams();
  const sortArr = ['추천순', '신규 가입', '최고 평가', '최저 가격', '최고 가격'];
  const genderArr = ['모두', '여성', '남성'];
  const navigate = useNavigate();

  useEffect(() => {
    if (gameId) {
      return;
    }
    navigate('/', { replace: true });
  }, [gameId, navigate]);

  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery<
    GameMate[],
    Error,
    InfiniteData<GameMate[]>,
    [string, string, string],
    number
  >({
    queryKey: ['user', 'mate', gameId as string],
    queryFn: getGameMatesByCategory,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.at(-1)?.id,
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
    <CommonLayout>
      <TitleIntro
        titleE={getGame(Number(gameId))?.subTitle}
        titleK={getGame(Number(gameId))?.title}
        content={getGame(Number(gameId))?.description}
      />
      <div className='flex'>
        <div className='flex w-[240px] flex-col gap-6 bg-[#e2e2e2] px-[20px] py-[30px]'>
          <div>
            <div className='text-[#8A8C99]'>정렬</div>
            {sortArr.map((v, i) => (
              <div key={i}>
                <input
                  type='radio'
                  id={`sort${i + 1}`}
                  value={v}
                  checked={sort === v}
                  onChange={() => setSort(v)}
                  hidden
                />
                <label htmlFor={`sort${i + 1}`} className='mt-3 flex items-center gap-2'>
                  <img
                    src={sort === v ? '/src/assets/imgs/radioTrue.svg' : '/src/assets/imgs/radioFalse.svg'}
                    alt='라디오 버튼 아이콘'
                  />
                  <span className='text-sm text-[#525566]'>{v}</span>
                </label>
              </div>
            ))}
          </div>

          <div>
            <div className='text-[#8A8C99]'>성별</div>
            {genderArr.map((v, i) => (
              <div key={i}>
                <input
                  type='radio'
                  id={`gender${i + 1}`}
                  value={v}
                  checked={gender === v}
                  onChange={() => setGender(v)}
                  hidden
                />
                <label htmlFor={`gender${i + 1}`} className='mt-3 flex items-center gap-2'>
                  <img
                    src={gender === v ? '/src/assets/imgs/radioTrue.svg' : '/src/assets/imgs/radioFalse.svg'}
                    alt='라디오 버튼 아이콘'
                  />
                  <span className='text-sm text-[#525566]'>{v}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div
          className='flex flex-col items-center justify-center bg-gray-100 py-11'
          style={{ width: `calc(100% - 200px)` }}
        >
          <div className='flex max-w-[1120px] flex-wrap gap-[10px] p-[20px]'>
            {data?.pages?.map((page) =>
              page.map((mate) => (
                <div key={mate.id} className='mb-4'>
                  <MateCard mate={mate} />
                </div>
              ))
            )}
          </div>
          {isFetching ? <Spinner /> : null}
          <div ref={ref} className='h-5 w-full bg-transparent'></div>
        </div>
      </div>
    </CommonLayout>
  );
}
