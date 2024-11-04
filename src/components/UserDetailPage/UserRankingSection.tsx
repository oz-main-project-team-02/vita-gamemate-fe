import Ranking from './Ranking';

export default function UserRankingSection() {
  return (
    <div className='h-[502px] w-[350px] rounded-3xl border bg-gradient-to-b from-softYellow from-0% via-[#FFFFFF] via-20% to-[#FFFFFF] to-90% px-5'>
      <h1 className='pt-5 text-2xl font-bold'>후원자 랭킹</h1>
      <p className='py-2 text-base font-medium underline decoration-primary decoration-4'>의뢰</p>
      <Ranking />
      <Ranking />
      <Ranking />
      <Ranking />
      <Ranking />
      <Ranking />
      <Ranking />
    </div>
  );
}
