import { UserProfileUpdateData } from '@/config/types';
import Female from './Female';
import Male from './Male';

type ProfileProps = {
  profile: UserProfileUpdateData;
  setProfile: React.Dispatch<React.SetStateAction<UserProfileUpdateData>>;
};

export default function GenderCheck({ profile, setProfile }: ProfileProps) {
  return (
    <div className='mb-[61px] h-[148px] w-full'>
      <p className='mb-[10px] text-2xl font-bold text-gray-500'>성별</p>
      {profile.gender === null ? (
        <>
          <Male profile={profile} setProfile={setProfile} />
          <Female profile={profile} setProfile={setProfile} />
        </>
      ) : profile.gender === 'male' ? (
        <Male profile={profile} setProfile={setProfile} />
      ) : (
        <Female profile={profile} setProfile={setProfile} />
      )}
      <p className='mt-[13px] text-base text-error'>성별은 수정이 불가합니다.</p>
    </div>
  );
}
