import { UserProfileUpdateData } from '@/config/types';

type ProfileProps = {
  profile: UserProfileUpdateData;
  setProfile: React.Dispatch<React.SetStateAction<UserProfileUpdateData>>;
};

export default function Description({ profile, setProfile }: ProfileProps) {
  return (
    <div className='mb-[61px] h-[214px] w-full'>
      <p className='mb-[10px] text-2xl font-bold text-gray-500'>소개</p>
      <input
        value={profile.description !== null ? profile.description : ''}
        onChange={(e) => setProfile({ ...profile, description: e.target.value })}
        className='h-[168px] w-full rounded-xl bg-primary pb-28 pt-1 indent-6 text-gray-500 focus:outline-none'
        placeholder='본인을 어필할 수 있어요!'
      />
    </div>
  );
}
