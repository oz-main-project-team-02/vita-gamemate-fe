export default function Spinner() {
  return (
    <div className='flex items-center justify-center bg-gray-100'>
      <div className='h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-transparent'></div>
    </div>
  );
}
