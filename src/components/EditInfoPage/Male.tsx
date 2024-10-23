import { UserProfileUpdateData } from '@/config/types';

type ProfileProps = {
  profile: UserProfileUpdateData;
  setProfile: React.Dispatch<React.SetStateAction<UserProfileUpdateData>>;
};

export default function Male({ profile, setProfile }: ProfileProps) {
  return (
    <input
      onClick={() => setProfile({ ...profile, gender: 'male' })}
      className='mr-1 h-[60px] w-[365px] cursor-pointer rounded-xl bg-primary text-[24px] font-bold hover:text-[25px]'
      type='button'
      value='남성'
    />
  );
}
