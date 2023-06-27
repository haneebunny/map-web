import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isWeekday, makeOperatingHours } from "../../common/api/date";
import { isBottomSheetExpandedState } from "../../common/store/atom";

export default function Content({ info }) {
    const [isBottomSheetExpanded, _] = useRecoilState(
        isBottomSheetExpandedState
    );

    const weekday = isWeekday();
    const [isOpen, endHour, endMinute] = makeOperatingHours(info);

    useEffect(() => {
        // sheet.current.addEventListener("transitionend", () => {
        //   console.log("애니메이션긑");
        //   setIsUp(false);
        // });
    }, []);

    return (
        <div className="w-full">
            <div className=" p-4">
                <h1 className="font-bold text-lg">
                    [{info?.payYn}] <span>{info?.parkingName}</span>
                </h1>
                <p className=" text-sm text-slate-500">{info?.addrRoad}</p>

                {/* 바텀시트 올리지 않았을 때 부분 */}
                {!isBottomSheetExpanded && (
                    <div className="w-full  h-20 rounded-xl bg-slate-100 p-2 flex  text-[0.9rem] text-slate-900 mt-2 mb-4">
                        <div className="h-12 m-auto flex flex-col justify-between">
                            <p>
                                <span className="font-bold">기본 요금 </span>|{" "}
                                {info?.rates}원
                            </p>
                            <p>
                                <span className="font-bold">추가 요금 </span>|{" "}
                                {info?.addTimeRate}분 당 {info?.addRates}원
                            </p>
                        </div>
                        <div className="h-10 m-auto  border-r border-gray-400"></div>
                        <div className="h-12 m-auto flex flex-col justify-between flex-initial">
                            <p>
                                <span className="font-bold">운영 시간 </span>|
                                {/* [{weekday ? "평일" : "휴일"}], */}~{endHour}
                                시 <span className="font-bold">{isOpen}</span>
                                {/* {info?.weekdayBeginTime.substring(0, 5)} ~{" "}
                            {info?.weekdayEndTime.substring(0, 5)} */}
                            </p>
                            <p>
                                <span className="font-bold">주차 여석 </span> |
                                총 {info?.capa} 개
                            </p>
                        </div>
                    </div>
                )}
                <h1 className="font-bold text-lg">주차가능대수</h1>
                <h1 className="font-bold text-lg">요금정보</h1>
            </div>

            {/* 바텀시트 올리지 않았을 때 버튼 */}
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

