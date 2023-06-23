import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isBottomSheetExpandedState } from "../../common/store/atom";

export default function Content({ info }) {
    const [isBottomSheetExpanded, _] = useRecoilState(
        isBottomSheetExpandedState
    );

    useEffect(() => {
        // sheet.current.addEventListener("transitionend", () => {
        //   console.log("애니메이션긑");
        //   setIsUp(false);
        // });
    }, []);

    return (
        <div className="w-full">
            <div className=" p-4">
                <p className=" font-bold">
                    [{info?.payYn}] <span>{info?.parkingName}</span>
                </p>
                <p className=" text-sm text-slate-500">{info?.addrRoad}</p>
                <div className="w-full  h-20 rounded-xl bg-slate-100 p-2 flex  text-[0.8rem] text-slate-900 mt-2">
                    <div className="m-auto flex-initial ">
                        <p>기본 요금 | {info?.rates}원</p>
                        <p>
                            추가 요금 | {info?.addTimeRate}분 당{" "}
                            {info?.addRates}원
                        </p>
                    </div>
                    <div className="m-auto h-10 border-r border-gray-400"></div>
                    <div className="m-auto flex-initial">
                        <p>
                            운영시간 | {info?.weekdayBeginTime.substring(0, 5)}{" "}
                            ~ {info?.weekdayEndTime.substring(0, 5)}
                        </p>
                        <p>주차가능 | 총 {info?.capa}</p>
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

