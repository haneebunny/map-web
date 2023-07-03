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

        console.log("mount");
        return () => {
            // setCurrentParkingLotInfo(null);
            console.log("unmount");
        };
    }, []);

    const onClickOutside = (e) => {
        console.log("onClickOutside");
        if (!isBottomSheetVisible) return;
        if (sheet.current && !sheet.current?.contains(e.target)) {
            console.log(isBottomSheetVisible);
            setIsBottomSheetVisible(false);
            console.log(isBottomSheetVisible);
        }
    };

    // BottomSheet 밖에 클릭시 BottomSheet 꺼짐
    useEffect(() => {
        // true면 들어와 ...
        // 마커 누름 -> onClickMarker에서 true로 만들어줌 -> useEffect에 들어왔는데 true라서 이벤트 등록함
        // 이벤트 등록된 거 실행됐는데 true니까 통과하고 sheet있고 sheet 누른 거 아니니까 visible이 false가 됨
        // sheet가 왜 있냐고! 아니 이건 있는 게 맞는 것 같은데
        // true로 만들어주는 시점을 바꿔야 하나?
        // true하면 useEffect 들어와서 이벤트 등록하고 함수 들어가서 false 만들어버림

        // isBottomSheetVisible로 나눌 수가 없어
        if (!isBottomSheetVisible) return;

        document.addEventListener("click", onClickOutside, {
            capture: false,
            once: true,
        });
        console.log("등록했어 ");
        return () => {
            document.removeEventListener("click", onClickOutside);

            console.log(isBottomSheetVisible);

            console.log("해제했어");
        };
    }, []);

    console.log("sheet", sheet);

    return (
        <>
            {isBottomSheetVisible && (
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
            )}
        </>
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

