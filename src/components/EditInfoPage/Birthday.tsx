type Profile = {
  profile_image: string | null;
  nickname: string;
  description: string | null;
  gender: string | null;
  birthday: string;
};

type ProfileProps = {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  birthYear: string;
  setBirthYear: React.Dispatch<React.SetStateAction<string>>;
  birthMonth: string;
  setBirthMonth: React.Dispatch<React.SetStateAction<string>>;
  birthDay: string;
  setBirthDay: React.Dispatch<React.SetStateAction<string>>;
  years: number[];
  months: number[];
  days: number[];
};

export default function Birthday({
  profile,
  setProfile,
  birthYear,
  setBirthYear,
  birthMonth,
  setBirthMonth,
  birthDay,
  setBirthDay,
  years,
  months,
  days,
}: ProfileProps) {
  return (
    <div className='mb-[61px] h-[93px] w-1/2'>
      <p className='mb-[10px] text-2xl font-bold text-gray-500'>생일</p>
      <select
        value={birthYear}
        onChange={(e) => {
          setBirthYear(e.target.value);
          setProfile({
            ...profile,
            birthday: `${e.target.value}-${birthMonth}-${birthDay}`,
          });
        }}
        className='form-control mx-3 w-[133px] rounded-md border border-gray-200'
      >
        <option value=''>년</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        value={birthMonth}
        onChange={(e) => {
          setBirthMonth(e.target.value);
          setProfile({
            ...profile,
            birthday: `${birthYear}-${e.target.value}-${birthDay}`,
          });
        }}
        className='form-control mx-3 w-[133px] rounded-md border border-gray-200'
      >
        <option value=''>월</option>
        {months.map((month) => (
          <option key={month} value={month < 10 ? `0${month}` : month}>
            {month < 10 ? `0${month}` : month}
          </option>
        ))}
      </select>

      <select
        value={birthDay}
        onChange={(e) => {
          setBirthDay(e.target.value);
          setProfile({
            ...profile,
            birthday: `${birthYear}-${birthMonth}-${e.target.value}`,
          });
        }}
        className='form-control mx-3 w-[133px] rounded-md border border-gray-200'
      >
        <option value=''>일</option>
        {days.map((day) => (
          <option key={day} value={day < 10 ? `0${day}` : day}>
            {day < 10 ? `0${day}` : day}
          </option>
        ))}
      </select>
    </div>
  );
}
