import FilterList from '../../components/Common/FilterList';
import TitleIntro from '../../components/Common/TitleIntro';
import ProfileImg from '../../components/Common/ProfileImg';
import GameMateApplicationForm from '@/components/GameMatePage/GameMateApplicationForm';

export default function GameMatePage() {
  return (
    <>
      <div className='w-full'>
        {/* <NavBar /> */}
        <TitleIntro titleE={'VITA GAMEMATE'} titleK={'게임 메이트'} content={'당신의 재능을 보여주세요!'} />
        <div className='relative h-[1866px] w-full bg-gray-100'>
          <ProfileImg />
          <div className='absolute flex h-[1866px] w-[30%] justify-end bg-[#E2E2E2]'>
            <FilterList />
          </div>
          <div className='absolute left-[40.5%] top-[260px] flex min-w-[686px] flex-col gap-10'>
            <GameMateApplicationForm />
          </div>
        </div>
      </div>
    </>
  );
}
