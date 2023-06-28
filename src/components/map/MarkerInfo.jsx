import { useState } from "react";

export default function MarkerInfo() {
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    return (
        <div
            onClick={() => setIsInfoOpen(!isInfoOpen)}
            className="fixed left-1 top-1 z-30 cursor-pointer"
        >
            {isInfoOpen ? (
                <div className="sm:text-xs  text-gray-700 flex flex-col gap-3 bg-[#ffffff83]  p-2 rounded-md">
                    <div className="flex gap-1">
                        <img
                            className="w-5 h-5 sm:w-4 sm:h-4"
                            src="./img/marker_blue_mini.png"
                        />
                        무료 주차장
                    </div>
                    <div className="flex gap-1">
                        <img
                            className="w-5 h-5 sm:w-4 sm:h-4"
                            src="./img/marker_yellow_mini.png"
                        />
                        유료 주차장
                    </div>
                </div>
            ) : (
                <div className="w-8 h-8 bg-[#ffffff83]  p-2 rounded-md">
                    <img
                        className="w-5 h-5 sm:w-4 sm:h-4 opacity-90"
                        src="./img/marker_blue_mini.png"
                    />
                </div>
            )}
        </div>
    );
}

