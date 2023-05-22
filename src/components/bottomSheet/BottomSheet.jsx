import BottomSheetHeader from "./BottomSheetHeader";
import { useBottomSheet } from "../../common/hook/useBottomSheet";
import { motion } from "framer-motion";
import Content from "./Content";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import {
  MIN_Y,
  MAX_Y,
  BOTTOM_SHEET_HEIGHT,
  TEMP,
} from "../../common/config/constants";
import { useEffect, useState } from "react";
// const { BOTTOM_SHEET_HEIGHT, MIN_Y } = dynamic(
//   () => {
//     return import("../../common/config/constants");
//   },
//   { ssr: false }
// );

export default function BottomSheet() {
  const [sheetHeight, setSheetHeight] = useState();

  const { sheet, content } = useBottomSheet();

  console.log("bottom_sheet_height", MIN_Y, MAX_Y, BOTTOM_SHEET_HEIGHT);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSheetHeight(window.innerHeight - 60);
    }
  }, []);

  return (
    <Wrapper
      ref={sheet}
      sheetheight={sheetHeight}
      // className={`flex flex-col fixed z-10  left-0 right-0 rounded-t-md bg-white shadow-md transition-transform duration-700 ease-in-out`}
    >
      <BottomSheetHeader />
      <div ref={content} className="overflow-touch">
        <Content />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;

  position: fixed;
  z-index: 1;
  top: calc(100% - 90px); /*시트가 얼마나 높이 위치할지*/
  left: 0;
  right: 0;

  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  height: ${(props) => props.sheetheight}px;

  background-color: gray;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  transition: transform 650ms ease-out; /*바텀시트 애니메이션 속도*/
`;
