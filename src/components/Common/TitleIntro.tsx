interface MyPageBarProps {
  titleE: string;
  titleK: string;
  content: string;
}

export default function TitleIntro({
  titleE,
  titleK,
  content,
}: MyPageBarProps) {
  return (
    <div className='relative w-full h-[226px]'>
      <div className='absolute left-[20%] bottom-[20%]'>
        <p className='text-[16px] text-softYellow'>{titleE}</p>
        <h1 className='text-5xl -mt-2 -mb-3'>
          <strong>{titleK}</strong>
        </h1>
        <p className='text-lg'>{content}</p>
      </div>
    </div>
  );
}