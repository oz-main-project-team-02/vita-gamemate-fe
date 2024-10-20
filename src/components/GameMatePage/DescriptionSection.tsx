import { MateRegister } from '@/config/types';
import debounce from '@/utils/debounce';

type Props = {
  setFormData: React.Dispatch<React.SetStateAction<MateRegister>>;
};

export default function DescriptionSection({ setFormData }: Props) {
  const updateDescription = debounce((value) => {
    setFormData((prev: MateRegister) => ({ ...prev, description: value }));
  }, 1000);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    updateDescription(e.target.value);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col'>
        <h2 className='text-xl font-semibold'>재능 정보</h2>
        <p className='text-gray-400'>당신의 재능과 서비스와 특별함을 소개하세요.</p>
      </div>
      <textarea
        className='resize-none rounded-xl p-4 outline outline-gray-200'
        rows={5}
        placeholder='예시) 빠르게 캐리 해줄게요!&#13;당신의 뒤를 봐주고 킬을 따게 해줄 사람이 필요하다면 저를 선택하세요.&#13;어떤 모드든지 재밌기만 하면 상관없어요 :3'
        onChange={handleDescriptionChange}
      ></textarea>
    </div>
  );
}
