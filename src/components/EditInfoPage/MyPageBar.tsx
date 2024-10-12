interface MyPageBarProps {
  titleE: string;
  titleK: string;
  content: string;
}

export default function MyPageBar({titleE, titleK, content}: MyPageBarProps) {
  return (
    <div className="w-[1920px] h-[233px]">
      <div className="absolute inset-x-[400px] top-[80px]">
        <p className="my-[-6px] text-[15px] text-softYellow">{titleE}</p>
        <h1 className="text-5xl"><strong>{titleK}</strong></h1>
        <p className="leading-3 text-lg">{content}</p>
      </div>
    </div>
  );
}