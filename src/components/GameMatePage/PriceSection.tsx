import { MateRegister } from '@/config/types';
import debounce from '@/utils/debounce';

type Props = {
  setFormData: React.Dispatch<React.SetStateAction<MateRegister>>;
};

export default function PriceSection({ setFormData }: Props) {
  const handleChangePrice = debounce((e) => {
    const { value } = e.target;

    setFormData((prev) => ({ ...prev, request_price: value }));
  }, 1000);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-4'>
        <div>
          <h2 className='text-xl font-semibold'>재능 가격</h2>
          <p className='text-gray-400'>원하는 가격을 설정하여 재능을 제공하세요.</p>
        </div>
        <input
          type='text'
          maxLength={4}
          className='flex h-[50px] items-center justify-between rounded-xl bg-white p-4 text-gray-400 outline outline-gray-200'
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (
              /[0-9]/.test(e.key) === false &&
              e.key !== 'Backspace' &&
              e.key !== 'Delete' &&
              e.key !== 'Tab' &&
              e.key !== 'ArrowLeft' &&
              e.key !== 'ArrowRight'
            ) {
              e.preventDefault();
            }
          }}
          onChange={(e) => handleChangePrice(e)}
          placeholder='코인을 입력하세요'
        />
      </div>
    </div>
  );
}
