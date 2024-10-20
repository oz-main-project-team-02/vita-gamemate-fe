type Profile = {
  profileImage: string | null | undefined;
  nickname: string;
  description: string | null;
  gender: string | null;
  date: string;
};

type ProfileProps = {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
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
