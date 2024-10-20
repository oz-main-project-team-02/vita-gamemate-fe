type Props = {
  [key: string]: string | undefined;
};

export default function TitleIntro({ titleE, titleK, content }: Props) {
  return (
    <div className='relative h-[226px] w-full'>
      <div className='absolute bottom-[20%] left-[20%]'>
        <p className='text-[16px] text-softYellow'>{titleE}</p>
        <h1 className='-mb-3 -mt-2 text-5xl'>
          <strong>{titleK}</strong>
        </h1>
        <p className='text-lg'>{content}</p>
      </div>
    </div>
  );
}
