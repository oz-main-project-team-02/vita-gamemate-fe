interface SpinnerProps {
  w?: number;
  h?: number;
}

export default function Spinner({ w = 36, h = 36 }: SpinnerProps) {
  return (
    <div className='flex items-center justify-center'>
      <div
        style={{ width: `${w}px`, height: `${h}px` }}
        className='animate-spin rounded-full border-4 border-gray-300 border-t-blue-500'
      ></div>
    </div>
  );
}
