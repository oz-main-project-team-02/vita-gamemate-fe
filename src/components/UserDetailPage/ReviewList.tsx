export default function ReviewList() {
  return (
    <div className="w-full h-14 mb-6 flex items-center justify-end">
      <div className="w-10 h-10 border rounded-full bg-slate-200">
        <img className="w-10 h-10 rounded-full" src="/src/assets/imgs/user.png" alt="user" />
      </div>
      <div className="w-3/4 h-14 ml-2">
        <p>닉네임</p>
        <div className="flex">
          <img src="/src/assets/imgs/star.svg" alt="star" />
          <img src="/src/assets/imgs/star.svg" alt="star" />
          <img src="/src/assets/imgs/star.svg" alt="star" />
          <img src="/src/assets/imgs/star.svg" alt="star" />
          <img src="/src/assets/imgs/star.svg" alt="star" />
        </div>
        <p className="text-sm text-gray-400">리뷰 content</p>
      </div>
      <p className="w-auto mt-[-40px] ml-auto text-xs text-gray-300 origin-left">10-17 1:18</p>
    </div>
  )
}
