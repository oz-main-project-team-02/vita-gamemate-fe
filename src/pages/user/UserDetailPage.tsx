import TitleIntro from '@/components/Common/TitleIntro';
import { MateGameInfo, User } from '@/config/types';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/api/client';
import { useOrderModalStore } from '@/config/store';
import { OrderModal } from '@/components/Common/OrderModal';
import { useEffect, useState } from 'react';
import userImage from '@/assets/imgs/user.png';
import UserBar from '@/components/UserDetailPage/UserBar';
import GameOrderSection from '@/components/UserDetailPage/GameOrderSection';
import GameInfoSection from '@/components/UserDetailPage/GameInfoSection';
import ReviewSection from '@/components/UserDetailPage/ReviewSection';
import SelectGameSection from '@/components/UserDetailPage/SelectGameSection';

export default function UserDetailPage() {
  const { userId } = useParams();
  const { isOrderModalOpen } = useOrderModalStore();
  const [selectGame, setSelectGame] = useState<MateGameInfo>();
  const [isReview, setIsReview] = useState<boolean>(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data: mate } = useQuery<User>({
    queryKey: ['user', Number(userId)],
    queryFn: async () => {
      try {
        const { data } = await client.get(`/api/v1/users/${userId}/profile/`);
        return data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  useEffect(() => {
    if (searchParams.get('game') && mate) {
      const gameId = Number(searchParams.get('game'));
      const game = mate.mate_game_info?.find((game) => game.game_id === gameId);
      setSelectGame(game);
    }
  }, [searchParams, mate]);

  if (!mate) {
    return (
      <>
        <div className='relative z-20 h-[226px] w-full'>
          <div className='absolute bottom-[20%] left-[10%] lg:left-[15%] xl:left-[20%]'>
            <div className='flex flex-col gap-3'>
              <div className='skeleton-shimmer h-[14px] w-[160px] rounded-lg bg-gray-200 text-sm lg:h-[16px] lg:w-[180px] lg:text-base xl:h-[18px] xl:w-[200px] xl:text-lg'></div>
              <div className='skeleton-shimmer h-[30px] w-[240px] rounded-2xl bg-gray-200 text-3xl leading-none lg:h-[36px] lg:w-[270px] lg:text-4xl xl:h-[48px] xl:w-[300px] xl:text-5xl'></div>
              <div className='skeleton-shimmer h-[14px] w-[60px] rounded-lg bg-gray-200 text-sm lg:h-[16px] lg:w-[80px] lg:text-base xl:h-[18px] xl:w-[100px] xl:text-lg'></div>
            </div>
          </div>
        </div>
        <div className='h- relative flex w-full flex-1 flex-col items-center bg-gray-100 pt-[50px]'>
          <div className='relative mb-[48px] flex h-[127px] w-full max-w-[1000px] rounded-3xl border bg-[#FFFFFF] px-[37px] py-[27px]'>
            <div className='skeleton-shimmer h-[70px] w-[70px] rounded-full bg-gray-200'></div>
            <div className='mx-5 flex h-[75px] w-auto flex-col'>
              <p className='skeleton-shimmer mb-[1px] h-4 w-24 rounded-md bg-gray-200'></p>
              <div className='relative flex h-[20px] w-full items-start'>
                <div className='relative ml-[-8px] mt-[-9px] w-[100px]'></div>
              </div>
              <div className='mt-2 flex items-center'>
                <div className='skeleton-shimmer h-[20px] w-[40px] rounded-xl bg-gray-200 pl-[15px] text-sm text-[#FFFFFF]'>
                  id
                </div>
                <p className='skeleton-shimmer ml-2 h-4 w-12 rounded-md bg-gray-200'></p>
              </div>
            </div>
            <button className='skeleton-shimmer absolute right-[40px] my-4 flex h-[36px] w-[36px] items-center justify-center rounded-full bg-gray-200'></button>
          </div>
          <div className='h-[800px] w-full max-w-[1000px] rounded-3xl border bg-[#FFFFFF]'></div>
        </div>
      </>
    );
  }

  return (
    <>
      {isOrderModalOpen && selectGame && <OrderModal selectGame={selectGame} mate={mate} />}
      <div className='w-full'>
        <TitleIntro titleE={'Vita User'} titleK={'사용자 정보'} content={'비타 유저를 구경하세요!'} />

        <div className='relative flex w-full flex-col items-center bg-gray-100 pt-[50px]'>
          <UserBar mate={mate} userId={userId} />

          <div className='mb-[300px] flex w-[1000px] justify-between'>
            <div
              className={`h-[560px] w-[350px] rounded-3xl border bg-[#FFFFFF] ${mate.is_mate && mate.mate_game_info?.length !== undefined ? 'mt-[220px]' : ''}`}
            >
              <img
                className='h-[350px] w-full rounded-t-3xl object-cover'
                src={mate?.profile_image ?? userImage}
                alt='user'
              />
              <h1 className='px-5 pt-3 text-xl font-bold'>소개</h1>
              <p className='px-5'>{mate.description}</p>
            </div>

            {mate.is_mate && mate.mate_game_info?.length !== 0 ? (
              <>
                <div className='relative w-[620px]'>
                  {/* 게임 의뢰 정보 */}
                  <GameOrderSection mate={mate} gameId={Number(searchParams.get('game'))} />

                  {/* 게임 정보 */}
                  {selectGame && <GameInfoSection selectGame={selectGame} />}

                  {/* 게임 선택 */}
                  <SelectGameSection mate={mate} setSelectGame={setSelectGame} setIsReview={setIsReview} />

                  {/* 리뷰 정보 */}
                  {selectGame && (
                    <ReviewSection
                      userId={userId}
                      selectGame={selectGame}
                      isReview={isReview}
                      setIsReview={setIsReview}
                    />
                  )}
                </div>
              </>
            ) : (
              <div className='flex h-[193px] w-[620px] flex-col items-center justify-around rounded-3xl border bg-[#FFFFFF] p-8'>
                <div className='text-xl font-bold'>이 사용자는 현재 lita 게임 메이트가 아닙니다</div>
                <button
                  onClick={() => navigate(-1)}
                  className='h-[40px] w-[100px] rounded-xl border-2 hover:bg-gray-200'
                >
                  이전 페이지
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
