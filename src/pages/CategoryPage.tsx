import CommonLayout from '../layouts/CommonLayout';
import TitleIntro from '../components/Common/TitleIntro';
import { useParams } from 'react-router-dom';
import { getGame } from '../config/const';
import FilterSidebar from '@/components/CategoryPage/FilterSidebar';
import GameCategoryCardList from '@/components/CategoryPage/GameCategoryCardList';

export default function CategoryPage() {
  const { gameId } = useParams();

  return (
    <CommonLayout>
      <TitleIntro
        titleE={getGame(Number(gameId))?.subTitle}
        titleK={getGame(Number(gameId))?.title}
        content={getGame(Number(gameId))?.description}
      />
      <div className='flex'>
        <FilterSidebar /> {/* Section left */}
        <GameCategoryCardList gameId={gameId} /> {/* section Right */}
      </div>
    </CommonLayout>
  );
}
