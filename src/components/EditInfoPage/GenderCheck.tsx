import { UserProfileUpdateData } from '@/config/types';

type ProfileProps = {
  profile: UserProfileUpdateData;
  setProfile: React.Dispatch<React.SetStateAction<UserProfileUpdateData>>;
};

export default function GenderCheck({ profile, setProfile }: ProfileProps) {
  return (
    <div className='mb-[61px] h-[148px] w-full'>
      <p className='mb-[10px] text-2xl font-bold text-gray-500'>성별</p>
      <input
        onClick={() => setProfile({ ...profile, gender: 'male' })}
        className={`mr-3 h-[50px] w-[120px] cursor-pointer rounded-xl text-[18px] font-bold hover:scale-95 lg:h-[55px] lg:w-[155px] lg:text-[24px] ${profile.gender === 'male' ? 'bg-skyGray' : 'bg-primary'}`}
        type='button'
        value='남성'
      />
      <input
        onClick={() => setProfile({ ...profile, gender: 'female' })}
        className={`h-[50px] w-[120px] cursor-pointer rounded-xl text-[18px] font-bold hover:scale-95 lg:h-[55px] lg:w-[155px] lg:text-[24px] ${profile.gender === 'female' ? 'bg-softPink' : 'bg-primary'}`}
        type='button'
        value='여성'
      />
    </div>
  );
}
