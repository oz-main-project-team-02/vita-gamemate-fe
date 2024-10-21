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

export default function Nickname({ profile, setProfile }: ProfileProps) {
  return (
    <div className='mb-[61px] h-[144px] w-full'>
      <p className='mb-[10px] text-2xl font-bold text-gray-500'>닉네임</p>
      <input
        value={profile.nickname}
        onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
        className='h-[66px] w-full rounded-xl bg-primary px-6 focus:outline-none'
      />
      <p className={profile.nickname === '' ? 'hidden' : 'mt-[13px] text-base text-error'}>
        매주 한 번만 변경 가능하니 신중하게 설정하세요
      </p>
    </div>
  );
}
