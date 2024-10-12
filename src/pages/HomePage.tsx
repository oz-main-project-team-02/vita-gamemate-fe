import EventBanner from "../components/Homepage/EventBanner";
import CommonLayout from "../layouts/CommonLayout";

export default function HomePage() {
  return (
    <CommonLayout>
      <div className='relative'>
        <div className='h-[440px]'>
          <div className='absolute top-[150px] left-0 right-0'>
            <EventBanner />
          </div>
        </div>
        <div className='h-[760px] bg-gray-100'></div>
        <div className='h-[760px]'></div>
        <div className='h-[760px]'></div>
        <p>Welcome to the home page</p>
      </div>
    </CommonLayout>
  );
}
