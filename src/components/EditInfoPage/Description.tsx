import { UserProfileUpdateData } from '@/config/types';

type ProfileProps = {
  profile: UserProfileUpdateData;
  setProfile: React.Dispatch<React.SetStateAction<UserProfileUpdateData>>;
};

export default function Description({ profile, setProfile }: ProfileProps) {
  return (
    <div className='relative mb-[61px] h-[214px] w-full'>
      <p className='mb-[10px] text-2xl font-bold text-gray-500'>소개</p>
      <textarea
        value={profile.description !== null ? profile.description : ''}
        onChange={(e) =>
          e.target.value.length <= 200 ? setProfile({ ...profile, description: e.target.value }) : null
        }
        className='h-[168px] w-full resize-none rounded-xl bg-primary px-6 py-5 text-gray-500 focus:outline-none'
        placeholder='본인을 어필할 수 있어요!'
      />
      <p className='absolute bottom-[13px] right-4 text-gray-400'>{profile.description?.length} / 200</p>
    </div>
  );
}
