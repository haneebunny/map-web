import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { noticeList } from "../../common/store/atom";

export default function ParkingLotInfo() {
    const [noticeListState, setNoticeListState] = useRecoilState(noticeList);
    const [parkingLotName, setParkingLotName] = useState("");
    const [coloredNumber, setColoredNumber] = useState("");

    useEffect(() => {
        if (!noticeList) return;
        if (!noticeListState[0]) return;

        const parts = noticeListState[0]?.split("|");

        if (parts.length !== 2 || !/\d+/.test(parts[1])) {
            return null;
        }

        const coloredNumber = parts[1]?.replace(
            /\b(\d+)\b/g,
            "<span style='color: red'>$1</span>"
        );

        setParkingLotName(parts[0]);
        setColoredNumber(coloredNumber);
    }, [noticeListState]);
    console.log(noticeListState);
    return (
        <div className="absolute left-[50%] top-10 z-10">
            파킹뢋롸 인포
            <div className="">
                <p className="px-3 py-1  text-white bg-opacity-90 bg-amber-400 rounded-2xl">
                    <span className="font-bold">
                        [{parkingLotName} 주차장]{" "}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: coloredNumber }} />
                </p>
            </div>
        </div>
    );
}

