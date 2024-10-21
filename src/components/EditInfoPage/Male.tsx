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

export default function Male({ profile, setProfile }: ProfileProps) {
  return (
    <input
      onClick={() => setProfile({ ...profile, gender: 'male' })}
      className='mr-1 h-[60px] w-[365px] cursor-pointer rounded-xl bg-primary text-[24px] font-bold'
      type='button'
      value='남성'
    />
  );
}
