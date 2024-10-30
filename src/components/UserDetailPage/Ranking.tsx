export default function Ranking() {
  return (
    <div className='relative mb-2 flex h-[50px] w-full items-center justify-end'>
      <p className='w-5'>1</p>
      <div className='h-9 w-9 rounded-full bg-slate-200'>
        <img className='h-9 w-9 rounded-full' src='/src/assets/imgs/user.png' alt='user' />
      </div>
      <p className='ml-2 w-[150px] text-sm'>닉네임</p>
      <div className='ml-auto mr-1 flex w-auto'>
        <p className='origin-left text-sm text-gray-400'>12345</p>
        <img className='ml-1 h-5 w-5' src='/src/assets/imgs/vitaCoin.svg' alt='vitaCoin' />
      </div>
    </div>
  );
}
