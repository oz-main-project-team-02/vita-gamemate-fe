import '@/global.css';

export default function SkeletonTodayGameMate() {
  return (
    <div className='relative flex h-[206px] w-[652px] gap-4 rounded-3xl bg-white p-4 shadow-md'>
      {/* Skeleton for image */}
      <div className='skeleton-shimmer h-full w-1/3 rounded-2xl bg-gray-200'>
        <div className='h-full w-full rounded-2xl' />
      </div>

      {/* Skeleton for text */}
      <div className='my-2 flex w-full flex-col gap-4'>
        <div className='flex w-full flex-col gap-6'>
          <div className='skeleton-shimmer h-5 w-[30%] rounded-md'></div>
          <div className='flex flex-col gap-2'>
            <div className='skeleton-shimmer h-5 w-[70%] rounded-md'></div>
            <div className='skeleton-shimmer h-5 w-[50%] rounded-md'></div>
          </div>
        </div>

        <div className='flex h-full w-full gap-2'>
          <div className='skeleton-shimmer h-full w-[15%] rounded-md'></div>
          <div className='flex h-full w-full flex-col gap-2'>
            <div className='skeleton-shimmer h-5 w-[30%] rounded-md'></div>
            <div className='skeleton-shimmer h-5 w-[30%] rounded-md'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
