import FilterList from '../components/EditInfoPage/FilterList';
import TitleIntro from '../components/Common/TitleIntro';
import ProfileImg from '../components/EditInfoPage/ProfileImg';
import CommonLayout from '../layouts/CommonLayout';
import GameSelect from '../components/GameMatePage/GameSelect';
import TeamBattleForm from '../components/GameMatePage/TeamBattleForm';

export default function GameMatePage() {
  return (
    <CommonLayout>
      <div className='h-[4105px] w-full'>
        {/* <NavBar /> */}
        <TitleIntro titleE={'VITA GAMEMATE'} titleK={'게임 메이트'} content={'당신의 재능을 보여주세요!'} />
        <div className='relative h-[1866px] w-full bg-gray-100'>
          <ProfileImg />
          <div className='absolute left-[40.5%] top-[260px] flex min-w-[686px] flex-col gap-10'>
            <GameSelect />
            <TeamBattleForm />
          </div>
          <div className='absolute flex h-[1866px] w-[30%] justify-end bg-[#E2E2E2]'>
            <FilterList />
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
