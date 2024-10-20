import EventSlider from './EventSlider';

export default function EventSection() {
  return (
    <div className='h-[440px] px-[100px]'>
      <div className='absolute left-0 right-0 top-[150px]'>
        <EventSlider />
      </div>
    </div>
  );
}
