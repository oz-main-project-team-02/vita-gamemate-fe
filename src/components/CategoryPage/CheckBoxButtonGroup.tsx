import { getGame } from '@/config/const';

type Props = {
  gameId: string;
  label: string;
  selectedValue: string[];
  setSelectedValue: (value: string[]) => void;
};

export default function CheckBoxButtonGroup({ gameId, label, selectedValue, setSelectedValue }: Props) {
  const game = getGame(Number(gameId));

  if (!game) {
    return null;
  }

  const levelOptions = game?.level.map((korValue, i) => {
    const engValue = game?.engLevel[i] || '';
    return [korValue, engValue];
  });

  console.log(levelOptions);

  const handleCheckboxChange = (value: string) => {
    if (selectedValue.includes(value)) {
      console.log(selectedValue.filter((v) => v !== value));
      setSelectedValue(selectedValue.filter((v) => v !== value));
    } else {
      console.log([...selectedValue, value]);
      setSelectedValue([...selectedValue, value]);
    }
  };

  return (
    <div>
      <div className='text-[#8A8C99]'>{label}</div>
      {levelOptions.map(([key, value], i) => (
        <div key={i}>
          <input
            type='checkbox'
            id={`${value}-${i + 1}`}
            value={value}
            onChange={() => handleCheckboxChange(value)}
            checked={selectedValue.includes(value)}
            hidden
          />
          <label htmlFor={`${value}-${i + 1}`} className='mt-3 flex items-center gap-2'>
            <img
              src={selectedValue.includes(value) ? '/src/assets/imgs/radioTrue.svg' : '/src/assets/imgs/radioFalse.svg'}
              alt='체크박스 버튼 아이콘'
            />
            <span className='text-sm text-[#525566]'>{key}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
