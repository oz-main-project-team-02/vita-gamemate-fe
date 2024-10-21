type Props = {
  label: string;
  options: [string, string][];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
};

export default function RadioButtonGroup({ label, options, selectedValue, setSelectedValue }: Props) {
  return (
    <div>
      <div className='text-[#8A8C99]'>{label}</div>
      {options.map(([key, value], i) => (
        <div key={i}>
          <input
            type='radio'
            id={`${value}-${i + 1}`}
            value={value}
            checked={selectedValue === value}
            onChange={() => setSelectedValue(value)}
            hidden
          />
          <label htmlFor={`${value}-${i + 1}`} className='mt-3 flex items-center gap-2'>
            <img
              src={selectedValue === value ? '/src/assets/imgs/radioTrue.svg' : '/src/assets/imgs/radioFalse.svg'}
              alt='라디오 버튼 아이콘'
            />
            <span className='text-sm text-[#525566]'>{key}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
