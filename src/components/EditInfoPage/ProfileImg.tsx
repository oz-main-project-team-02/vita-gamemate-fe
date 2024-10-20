import { useUserStore } from '@/config/store';
import { TiUser } from 'react-icons/ti';

export default function ProfileImg() {
  const { user } = useUserStore();

  return (
    <div className='absolute left-[40%] top-[-110px] h-[300px] w-[300px] rounded-full bg-slate-200'>
      {user.profile_image !== null ? (
        <img className='h-[300px] w-[300px] rounded-full object-cover' src={user.profile_image!} alt='user' />
      ) : (
        <TiUser size={305} />
      )}
    </div>
  );
}
