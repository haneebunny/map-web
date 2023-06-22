import { useRecoilState } from "recoil";
import { noticeList } from "../../common/store/atom";

export default function ParkingLotInfo() {
    const [noticeListState, setNoticeListState] = useRecoilState(noticeList);

    console.log(noticeListState);
    return (
        <div className="absolute left-[50%] top-10 z-10">
            파킹뢋롸 인포
            <div className="">
                <p className="px-2 py-1 bg-opacity-70 bg-amber-400 rounded-xl">
                    {noticeListState[0]}
                </p>
            </div>
        </div>
    );
}

