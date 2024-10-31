type Props = {
  [key: string]: string | undefined;
};

export default function TitleIntro({ titleE, titleK, content }: Props) {
  return (
    <div className='relative z-20 h-[226px] w-full'>
      <div className='absolute bottom-[20%] left-[10%] lg:left-[15%] xl:left-[20%]'>
        <p className='text-sm text-softYellow lg:text-base xl:text-lg'>{titleE}</p>
        <h1 className='text-3xl leading-none lg:text-4xl xl:text-5xl'>
          <strong>{titleK}</strong>
        </h1>
        <p className='text-sm lg:text-base xl:text-lg'>{content}</p>
      </div>
    </div>
  );
}
