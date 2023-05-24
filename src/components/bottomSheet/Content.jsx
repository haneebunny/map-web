import { useEffect } from "react";

export default function Content({ isUp, setIsUp, sheet }) {
  useEffect(() => {
    sheet.current.addEventListener("touchstart", () => {
      console.log("시시시작");
    });

    // sheet.current.addEventListener("transitionend", () => {
    //   console.log("애니메이션긑");
    //   setIsUp(false);
    // });
  }, []);
  return (
    <div>
      <div className=" p-3">
        <p>
          [(주)알트에이] <span className=" font-bold">벽산디지털밸리 2차</span>
        </p>
        <p className=" text-sm text-slate-500">
          서울시 금천구 가산디지털2로 184
        </p>
        <div className="w-full  h-20 rounded-xl bg-slate-100 p-3 flex  text-sm mt-2">
          <div className="p-2 w-[35%] border-r border-gray-400">
            <p>요금</p>
          </div>
          <div className="p-2">
            <p>운영시간 | 00:00 ~ 24:00</p>
            <p>주차가능 | 총 62</p>
          </div>
        </div>

        {!isUp && (
          <div className="w-full  h-14 fixed  left-0">
            <button className="w-[50%] h-full bg-cyan-900 text-white">
              상세정보
            </button>
            <button className="w-[50%] h-full bg-sky-500 text-white">
              주차하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
