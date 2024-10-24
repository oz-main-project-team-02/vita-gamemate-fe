import { UserProfileUpdateData } from '@/config/types';

type ProfileProps = {
  profile: UserProfileUpdateData;
  setProfile: React.Dispatch<React.SetStateAction<UserProfileUpdateData>>;
};

export default function Nickname({ profile, setProfile }: ProfileProps) {
  return (
    <div className='relative mb-[61px] h-[144px] w-full'>
      <p className='mb-[10px] text-2xl font-bold text-gray-500'>닉네임</p>
      <input
        value={profile.nickname}
        onChange={(e) => (e.target.value.length <= 10 ? setProfile({ ...profile, nickname: e.target.value }) : null)}
        className='h-[66px] w-full rounded-xl bg-primary px-6 focus:outline-none'
      />
      <p className='absolute bottom-[51px] right-5 text-gray-400'>{profile.nickname.length} / 10</p>
      <p className={profile.nickname === '' ? 'hidden' : 'mt-[13px] text-base text-error'}>
        {profile.nickname.length < 2
          ? '닉네임은 최소 2자 이상입니다'
          : '매주 한 번만 변경 가능하니 신중하게 설정하세요'}
      </p>
    </div>
  );
}
