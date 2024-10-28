import TitleIntro from '../components/Common/TitleIntro';
import { useParams } from 'react-router-dom';
import { getGame } from '../config/const';
import FilterSidebar from '@/components/CategoryPage/FilterSidebar';
import GameCategoryCardList from '@/components/CategoryPage/GameCategoryCardList';
import { useEffect, useState } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import debounce from '@/utils/debounce';

export default function CategoryPage() {
  const { gameId } = useParams();
  const [sortValue, setSortValue] = useState<string>('recommendation');
  const [genderValue, setGenderValue] = useState<string>('all');
  const [levelValue, setLevelValue] = useState<string[]>([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); // Transition을 주기위해 초기값 false

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // 첫 입장 화면의 크기에 따라 사이드바를 열거나 닫음
    const handleResize = debounce(() => {
      if (window.innerWidth >= 1200) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
      console.log('resize');
    }, 100);

    // 초기 실행: 현재 화면 크기에 따라 사이드바 상태 설정
    handleResize();

    // 리사이즈 이벤트에 handleResize 함수 등록
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <TitleIntro
        titleE={getGame(Number(gameId))?.subTitle}
        titleK={getGame(Number(gameId))?.title}
        content={getGame(Number(gameId))?.description}
      />

      <div className='relative flex w-full'>
        {/* 사이드바 */}
        <div className={`bg-[#e2e2e2] transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-[240px]' : 'w-0'}`}>
          <FilterSidebar
            gameId={gameId!}
            sortValue={sortValue}
            setSortValue={setSortValue}
            genderValue={genderValue}
            setGenderValue={setGenderValue}
            levelValue={levelValue}
            setLevelValue={setLevelValue}
          />

          <button
            onClick={toggleSidebar}
            className={`absolute top-0 z-10 flex items-center justify-center rounded-r-md bg-gray-800 px-2 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:bg-gray-700 ${
              isSidebarOpen ? 'left-[240px]' : 'left-0'
            }`}
            aria-label={isSidebarOpen ? '필터 조건 숨기기' : '필터 조건 보이기'}
          >
            {isSidebarOpen ? <FiX className='h-5 w-5' /> : <FiFilter className='h-5 w-5' />}
          </button>
        </div>

        {/* 카드 리스트 */}
        <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-[calc(100%-240px)]' : 'w-full'}`}>
          <GameCategoryCardList
            gameId={gameId}
            sortValue={sortValue}
            genderValue={genderValue}
            levelValue={levelValue}
          />
        </div>
      </div>
    </>
  );
}
