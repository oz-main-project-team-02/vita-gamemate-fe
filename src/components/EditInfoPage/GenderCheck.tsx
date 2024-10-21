import Female from './Female';
import Male from './Male';

type Profile = {
  profile_image: string | null;
  nickname: string;
  description: string | null;
  gender: string | null;
  birthday: string;
};

type ProfileProps = {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
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
