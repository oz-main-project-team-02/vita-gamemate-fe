export default function SkeletonMateCard() {
  return (
    <div>
      <div className='relative flex h-[288px] w-[206px] flex-col items-center justify-center overflow-hidden rounded-3xl leading-[1.3] shadow-lg'>
        <div className='skeleton-shimmer h-[206px] w-[206px] overflow-hidden bg-gray-200'>
          <div className='w-[206px]' />
        </div>
        <div className='h-[82px] w-[206px] p-3'>
          <div className='skeleton-shimmer mb-2 h-[16px] w-[140px] rounded-md bg-gray-200'></div>
          <div className='skeleton-shimmer h-[16px] w-[100px] rounded-md bg-gray-200'></div>
        </div>
      </div>
    </div>
  );
}
