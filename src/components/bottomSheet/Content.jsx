import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isBottomSheetExpandedState } from "../../common/store/atom";

export default function Content() {
  const [isBottomSheetExpanded, _] = useRecoilState(isBottomSheetExpandedState);

  useEffect(() => {
    // sheet.current.addEventListener("transitionend", () => {
    //   console.log("애니메이션긑");
    //   setIsUp(false);
    // });
  }, []);
  return (
    <div className="w-full">
      <div className=" p-3">
        <p>
          [(주)알트에이] <span className=" font-bold">벽산디지털밸리 2차</span>
        </p>
        <p className=" text-sm text-slate-500">
          서울시 금천구 가산디지털2로 184
        </p>
        <div className="w-full  h-20 rounded-xl bg-slate-100 p-3 flex  text-sm text-slate-900 mt-2">
          <div className="p-2 w-[35%] border-r border-gray-400">
            <p>요금</p>
          </div>
          <div className="p-2">
            <p>운영시간 | 00:00 ~ 24:00</p>
            <p>주차가능 | 총 62</p>
          </div>
        </div>
      </div>
      {!isBottomSheetExpanded && (
        <div className="w-full h-14 sticky  left-0 bottom-4">
          <button className="w-[50%] h-full bg-cyan-900 text-white">
            상세정보
          </button>
          <button className="w-[50%] h-full bg-sky-500 text-white">
            주차하기
          </button>
        </div>
      )}
    </div>
  );
}
