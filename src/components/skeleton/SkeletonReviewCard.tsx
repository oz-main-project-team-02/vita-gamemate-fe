export default function SkeletonReveiwCard() {
  return (
    <div className='flex h-[100px] justify-between rounded-3xl bg-white px-4 py-3 shadow-lg'>
      <div className='flex flex-col gap-2'>
        <div className='skeleton-shimmer h-5 w-[100px] rounded bg-gray-200'></div>
        <div className='skeleton-shimmer h-4 w-[200px] rounded bg-gray-200'></div>
      </div>
      <div className='skeleton-shimmer h-5 w-[70px] rounded bg-gray-200'></div>
    </div>
  );
}
