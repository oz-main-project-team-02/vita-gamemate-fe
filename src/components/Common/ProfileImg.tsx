import { useUserStore } from '@/config/store';

export default function ProfileImg() {
  const { user } = useUserStore();

  return (
    <div className='absolute left-[35%] top-[-120px] h-[300px] w-[30%]'>
      <div className='h-[300px] w-[52.6%] rounded-full bg-slate-200'>
        <img
          className='w-min-[100px] h-[300px] w-full rounded-full object-cover'
          src={user.profile_image !== null ? user.profile_image! : '/favicon.png'}
          alt='user'
        />
      </div>
      <div className='relative left-[58%] top-[-130px]'>
        <p className='text-2xl font-bold text-gray-500'>{user.nickname}</p>
        <p className='text-xl font-bold text-[#898989]'>id: {user.id}</p>
      </div>
    </div>
  );
}
