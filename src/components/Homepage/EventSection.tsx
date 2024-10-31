import EventSlider from './EventSlider';

export default function EventSection() {
  return (
    <div className='relative h-[240px] px-[100px] lg:h-[360px] xl:h-[440px]'>
      <div className='absolute left-0 right-0 top-[10px] lg:top-[100px] xl:top-[150px]'>
        <EventSlider />
      </div>
    </div>
  );
}
