import { UserProfileUpdateData } from '@/config/types';

type ProfileProps = {
  profile: UserProfileUpdateData;
  setProfile: React.Dispatch<React.SetStateAction<UserProfileUpdateData>>;
};

export default function Female({ profile, setProfile }: ProfileProps) {
  return (
    <input
      onClick={() => setProfile({ ...profile, gender: 'female' })}
      className='h-[60px] w-[365px] cursor-pointer rounded-xl bg-primary text-[24px] font-bold'
      type='button'
      value='여성'
    />
  );
}
