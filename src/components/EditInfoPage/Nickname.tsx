import { updateMyProfile } from '@/api/user';
import { UserProfileUpdateData } from '@/config/types';
import axios from 'axios';
import { toast } from 'react-toastify';

type ProfileProps = {
  profile: UserProfileUpdateData;
  setProfile: React.Dispatch<React.SetStateAction<UserProfileUpdateData>>;
};

export default function Nickname({ profile, setProfile }: ProfileProps) {
  const duplicationCheck = async () => {
    const data = new FormData();

    data.append('nickname', profile.nickname);

    try {
      await updateMyProfile(data);

      toast.success('사용 가능한 닉네임입니다!', {
        autoClose: 2000,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(`${err.response?.data.error}`, {
          autoClose: 2000,
        });
      }
    }
  };

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
        {profile.nickname.length < 2 ? '닉네임은 최소 2자 이상입니다' : ''}
      </p>
      <button
        type='button'
        onClick={duplicationCheck}
        className='absolute bottom-[0px] right-2 h-6 rounded-lg bg-[#eeeeee] px-2 text-sm'
      >
        중복 확인
      </button>
    </div>
  );
}
