import FilterList from '../../components/Common/FilterList';
import TitleIntro from '../../components/Common/TitleIntro';
import ProfileImg from '../../components/Common/ProfileImg';
import GameMateApplicationForm from '@/components/GameMatePage/GameMateApplicationForm';
import { useFilterListStore, useUserStore } from '@/config/store';
import { FaGamepad } from 'react-icons/fa';
import { IoMdAlert } from 'react-icons/io';

export default function GameMatePage() {
  const user = useUserStore((state) => state.user);
  const isFilterListOpen = useFilterListStore((state) => state.isFilterListOpen);
  const setIsFilterListToggle = useFilterListStore((state) => state.setIsFilterListToggle);

  return (
    <>
      <div className='h-full w-full'>
        <TitleIntro titleE='VITA GAMEMATE' titleK='게임 메이트' content='당신의 재능을 보여주세요!' />
        <div className='flex h-full w-full transition-all duration-300 ease-in-out'>
          {/* 필터 섹션 */}
          <div
            className={`relative z-30 transition-all duration-300 ease-in-out ${
              isFilterListOpen ? 'max-w-[300px] lg:max-w-[350px] xl:max-w-[400px]' : 'max-w-0'
            }`}
          >
            <FilterList isFilterListOpen={isFilterListOpen} setIsFilterListToggle={setIsFilterListToggle} />
          </div>
          {/* 메인 섹션 */}
          <div className={`relative flex-grow bg-gray-100 p-20 transition-all duration-300 ease-in-out`}>
            <ProfileImg />
            {/* 이벤트 배너 */}
            <div className='m-auto mt-[140px] max-w-[800px]'>
              {user.mate_game_info ? (
                <div className='mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg'>
                  <div className='p-6'>
                    <div className='mb-4 flex items-center space-x-4'>
                      <div className='animate-pulse rounded-full bg-blue-500 p-2'>
                        <FaGamepad className='h-6 w-6 text-white' />
                      </div>
                      <h2 className='text-2xl font-bold text-blue-600'>게임 메이트 안내</h2>
                    </div>
                    <p className='mb-4 text-gray-600'>
                      현재는 한 가지 게임에 대해서만 게임 메이트로 신청할 수 있습니다.
                    </p>
                    <p className='mb-4 text-gray-600'>
                      추후 업데이트를 통해 다양한 게임에서 메이트로 활동할 수 있도록 준비 중이니 많은 기대 부탁드립니다!
                    </p>
                    <div className='flex items-center space-x-2 text-sm text-blue-500'>
                      <IoMdAlert className='h-4 w-4' />
                      <span>곧 더 많은 게임이 추가될 예정입니다.</span>
                    </div>
                  </div>
                </div>
              ) : (
                <GameMateApplicationForm />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// m-auto mt-[140px] max-w-[800px]
