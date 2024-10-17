export default function UserRanking() {
  return (
    <div className="w-full h-[50px] relative mb-2 flex justify-end items-center">
      <p className="w-5">1</p>
      <div className="w-9 h-9 rounded-full bg-slate-200">
        <img className="w-9 h-9 rounded-full" src="/src/assets/imgs/user.png" alt="user" />
      </div>
      <p className="w-[150px] ml-2 text-sm">닉네임</p>
      <div className="w-auto mr-1 ml-auto flex">
        <p className="text-sm text-gray-400 origin-left">12345</p>
        <img className="w-5 h-5 ml-1" src="/src/assets/imgs/vitaCoin.svg" alt="vitaCoin" />
      </div>
    </div>
  )
}
