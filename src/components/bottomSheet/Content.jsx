import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isWeekday, makeOperatingHours } from "../../common/api/date";
import { isBottomSheetExpandedState } from "../../common/store/atom";

// icons
import { LuParkingCircle } from "react-icons/lu";
import { GrMoney } from "react-icons/gr";

const PARKING_STOREY = ["B1", "B2", "B3", "B4"];

export default function Content({ info }) {
    const [isBottomSheetExpanded, _] = useRecoilState(
        isBottomSheetExpandedState
    );

    const weekday = isWeekday();
    const { isOpen, endHour, endMinute, rates, addTimeRates } =
        makeOperatingHours(info);

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
                {!isBottomSheetExpanded ? (
                    <div className="w-full  h-20 rounded-xl bg-slate-100 p-2 flex  text-[0.9rem] text-slate-900 mt-2 mb-4">
                        <div className="h-12 m-auto flex flex-col justify-between">
                            <p>
                                <span className="font-bold">기본 요금 </span>|{" "}
                                {rates}
                            </p>
                            <p>
                                <span className="font-bold">추가 요금 </span>|{" "}
                                {addTimeRates}
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
                ) : (
                    <div className="mt-10">
                        <div>
                            <h1 className="font-bold text-lg flex items-center gap-1">
                                <LuParkingCircle />
                                주차가능대수
                            </h1>

                            {PARKING_STOREY?.map((storey) => (
                                <div key={storey} class="flex items-center p-3">
                                    <div class="w-10 text-md">{storey}</div>
                                    <div class="flex-grow mx-2 border-b border-dashed  border-gray-300"></div>
                                    <div class="flex items-center gap-2">
                                        <div class="font-bold">13</div>
                                        <div>/</div>
                                        <div class=" text-gray-400">100</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-b border-gray-500" />
                        <div>
                            <h1 className="font-bold text-lg flex items-center gap-1">
                                <GrMoney />
                                요금정보
                            </h1>
                            <div class="flex items-center p-3">
                                <div class="w-10 text-md">30분 당</div>
                                <div class="flex-grow mx-2 border-b border-dashed  border-gray-300"></div>
                                <div class="flex items-center gap-2">
                                    <div class="font-bold">1,500원</div>
                                    <div>/</div>
                                    <div class=" text-gray-400">100</div>
                                </div>
                            </div>
                            <div class="flex items-center p-3">
                                <div class="w-10 text-md">30분 당</div>
                                <div class="flex-grow mx-2 border-b border-dashed  border-gray-300"></div>
                                <div class="flex items-center gap-2">
                                    <div class="font-bold">1,500원</div>
                                    <div>/</div>
                                    <div class=" text-gray-400">100</div>
                                </div>
                            </div>
                            <div class="flex items-center p-3">
                                <div class="w-10 text-md">30분 당</div>
                                <div class="flex-grow mx-2 border-b border-dashed  border-gray-300"></div>
                                <div class="flex items-center gap-2">
                                    <div class="font-bold">1,500원</div>
                                    <div>/</div>
                                    <div class=" text-gray-400">100</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
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

