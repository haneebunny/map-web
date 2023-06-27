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

