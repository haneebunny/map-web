import { useState } from "react";
import { useRecoilState } from "recoil";
import { parkingLotConfigState } from "../../common/store/atom";

export default function MarkerInfo() {
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    const [parkingLotConfig, setParkingLotConfig] = useRecoilState(
        parkingLotConfigState
    );

    return (
        <div
            onClick={() => setIsInfoOpen(!isInfoOpen)}
            className="fixed left-1 top-1 z-30 cursor-pointer"
        >
            {isInfoOpen ? (
                <div className="sm:text-xs  text-gray-700 flex flex-col gap-3 bg-[#ffffff83]  p-2 rounded-md">
                    <div
                        onClick={() => {
                            setParkingLotConfig((prev) => ({
                                ...prev,
                                parkingFee: "무료",
                            }));
                        }}
                        className="flex gap-1"
                    >
                        <img
                            className="w-5 h-5 sm:w-4 sm:h-4"
                            src="./img/marker_blue_mini.png"
                        />
                        무료 주차장
                    </div>
                    <div
                        onClick={() => {
                            setParkingLotConfig((prev) => ({
                                ...prev,
                                parkingFee: "유료",
                            }));
                        }}
                        className="flex gap-1"
                    >
                        <img
                            className="w-5 h-5 sm:w-4 sm:h-4"
                            src="./img/marker_yellow_mini.png"
                        />
                        유료 주차장
                    </div>
                </div>
            ) : (
                <div className="sm:w-8 sm:h-8 bg-[#ffffff83] p-2 rounded-md">
                    {parkingLotConfig.parkingFee === "무료" ? (
                        <img
                            className="w-5 h-5 sm:w-4 sm:h-4 opacity-90"
                            src="./img/marker_blue_mini.png"
                        />
                    ) : (
                        <img
                            className="w-5 h-5 sm:w-4 sm:h-4 opacity-90"
                            src="./img/marker_yellow_mini.png"
                        />
                    )}
                </div>
            )}
        </div>
    );
}

