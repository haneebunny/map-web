import { atom } from "recoil";

export const isBottomSheetExpandedState = atom({
    key: "isBottomSheetExpandedState",
    default: false,
});

export const isBottomSheetVisibleState = atom({
    key: "isBottomSheetVisibleState",
    default: false,
});

export const noticeListState = atom({
    key: "noticeListState",
    default: [],
});

export const currentParkingLotState = atom({
    key: "currentParkingLotState",
    default: [],
});

export const parkingLotConfigState = atom({
    key: "parkingLotConfigState",
    default: {
        keyword: "광주", // 주차장명 또는 행정동 검색
        parkingFee: "", // 무료/유료/""
        page: 1, // 페이지 번호
        pageSize: 10, // 출력갯수
    },
});

