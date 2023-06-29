import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { isBot } from "next/dist/server/web/spec-extension/user-agent";

// hooks
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useBottomSheet } from "../../common/hook/useBottomSheet";

// atom
import { isBottomSheetVisibleState } from "../../common/store/atom";

// components
import BottomSheetHeader from "./BottomSheetHeader";
import Content from "./Content";

export default function BottomSheet({ info, setCurrentParkingLotInfo }) {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useRecoilState(
        isBottomSheetVisibleState
    );

    const [sheetHeight, setSheetHeight] = useState();

    const { sheet, content } = useBottomSheet();

    useEffect(() => {
        if (typeof window !== "undefined") {
            setSheetHeight(window.innerHeight - 30);
            // 바텀시트 올렸을 때 높이
        }

        return () => {
            // setCurrentParkingLotInfo(null);
        };
    }, []);

    // BottomSheet 밖에 클릭시 BottomSheet 꺼짐
    useEffect(() => {
        document.addEventListener("click", onClickOutside);

        return () => {
            document.removeEventListener("click", onClickOutside);
        };
    }, []);

    const onClickOutside = (e) => {
        if (!isBottomSheetVisible) return;

        if (sheet.current && !sheet.current?.contains(e.target)) {
            console.log(isBottomSheetVisible);
            setIsBottomSheetVisible(false);
            console.log(isBottomSheetVisible);
        }
    };

    console.log(isBottomSheetVisible);
    return (
        <Wrapper
            isvisible={isBottomSheetVisible.toString()}
            ref={sheet}
            sheetheight={sheetHeight}
            className={`flex flex-col fixed z-10  left-0 right-0 rounded-t-md bg-white shadow-md transition-transform duration-700 ease-in-out`}
        >
            <BottomSheetHeader />
            <div ref={content} className="overflow-touch">
                <Content info={info} />
            </div>
        </Wrapper>
    );
}

const Wrapper = styled(motion.div)`
    /* display: ${(props) => (props.isvisible ? "flex" : "none")}; */
    display: flex;
    flex-direction: column;

    position: absolute;
    z-index: 10;
    top: calc(100% - 240px); /*시트가 얼마나 높이 위치할지 90->50 변경*/
    left: 0;
    right: 0;

    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
    height: ${(props) => props.sheetheight}px;

    background-color: #ffffff;
    box-shadow: 10px 10px 10px 5px gray;
    /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */

    transition: transform 650ms ease-out; /*바텀시트 애니메이션 속도*/
`;

