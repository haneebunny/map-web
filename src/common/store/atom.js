import { atom } from "recoil";

export const isBottomSheetExpandedState = atom({
    key: "isBottomSheetExpandedState",
    default: false,
});

export const isBottomSheetVisibleState = atom({
    key: "isBottomSheetVisibleState",
    default: false,
});

export const noticeList = atom({
    key: "noticeList",
    default: [],
});

