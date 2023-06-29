import { useRef, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isBottomSheetExpandedState } from "../store/atom";

// interface BottomSheetMetrics {
//   touchStart: {
//     sheetY: number; // touchstart에서 BottomSheet의 최상단 모서리의 Y값
//     touchY: number; // touchstart에서 터치 포인트의 Y값
//   };
//   touchMove: {
//     prevTouchY?: number; // 다음 touchmove 이벤트 핸들러에서 필요한 터치 포인트 Y값을 저장
//     movingDirection: "none" | "down" | "up"; // 유저가 터치를 움직이고 있는 방향
//   };
// }

export function useBottomSheet() {
    const [minY, setMinY] = useState(60);
    const [maxY, setMaxY] = useState(0);
    const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useRecoilState(
        isBottomSheetExpandedState
    );

    const sheet = useRef(null);

    const content = useRef(null);

    const metrics = useRef({
        touchStart: {
            sheetY: 0,
            touchY: 0,
        },
        touchMove: {
            prevTouchY: 0,
            movingDirection: "none",
        },
        isContentAreaTouched: false,
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            setMaxY(window.innerHeight - 160);
        }
    }, []);

    useEffect(() => {
        const windowY = window.innerHeight;
        const maxY = windowY - 160;

        const canUserMoveBottomSheet = () => {
            const { touchMove, isContentAreaTouched } = metrics.current;

            if (!isContentAreaTouched) {
                return true;
            }

            if (sheet.current?.getBoundingClientRect().y !== minY) {
                return true;
            }

            if (touchMove.movingDirection === "down") {
                return content.current?.scrollTop <= 0;
            }
            return false;
        };

        const handleTouchStart = (e) => {
            const { touchStart } = metrics.current;
            touchStart.sheetY = sheet.current?.getBoundingClientRect().y;
            touchStart.touchY = e.touches[0].clientY;
        };
        const handleTouchMove = (e) => {
            const { touchStart, touchMove } = metrics.current;
            const currentTouch = e.touches[0];
            if (touchMove.prevTouchY === undefined) {
                touchMove.prevTouchY = touchStart.touchY;
            }

            if (touchMove.prevTouchY === 0) {
                // 맨 처음 앱 시작하고 시작시
                touchMove.prevTouchY = touchStart.touchY;
            }

            if (touchMove.prevTouchY < currentTouch.clientY) {
                touchMove.movingDirection = "down";
            }

            if (touchMove.prevTouchY > currentTouch.clientY) {
                setIsBottomSheetExpanded(true); // 여기 추가
                touchMove.movingDirection = "up";
            }

            if (canUserMoveBottomSheet()) {
                e.preventDefault();

                const touchOffset = currentTouch.clientY - touchStart.touchY;
                let nextSheetY = touchStart.sheetY + touchOffset;

                if (nextSheetY <= minY) {
                    nextSheetY = minY;
                }

                if (nextSheetY >= maxY) {
                    nextSheetY = maxY;
                }

                sheet.current?.style.setProperty(
                    "transform",
                    `translateY(${nextSheetY - maxY}px)`
                ); //바닥 만큼은 빼야한다
            } else {
                document.body.style.overflowY = "hidden";
            }
        };

        const handleTouchEnd = (e) => {
            document.body.style.overflowY = "auto"; //스크롤 설정
            const { touchMove } = metrics.current;

            const currentSheetY = sheet.current?.getBoundingClientRect().y;

            const transitionEnd = () => {
                // setIsUp(true); // 원래 코드

                if (touchMove?.movingDirection === "down") {
                    setIsBottomSheetExpanded(false);
                } // 이 부분 추가

                if (touchMove?.movingDirection === "up") {
                    setIsBottomSheetExpanded(true);
                } // 이 부분 추가
            };
            if (currentSheetY !== minY) {
                if (touchMove.movingDirection === "down") {
                    sheet.current.style.setProperty(
                        "transform",
                        "translateY(0)"
                    );
                    // sheet.current.removeEventListener("transitionend", transitionEnd);
                }

                if (touchMove.movingDirection === "up") {
                    sheet.current.style.setProperty(
                        "transform",
                        // `translateY(${minY - maxY}px)`
                        "translateY(-30%)"
                    );

                    // sheet.current.addEventListener("transitionend", transitionEnd);
                }
            }

            if (currentSheetY === minY) {
                // setIsUp(false);
                sheet.current.removeEventListener(
                    "transitionend",
                    transitionEnd
                );
                return; // 230530 ***
            }

            sheet.current.addEventListener("transitionend", transitionEnd);

            // metrics 초기화.
            metrics.current = {
                touchStart: {
                    sheetY: 0,
                    touchY: 0,
                },
                touchMove: {
                    prevTouchY: 0,
                    movingDirection: "none",
                },
                isContentAreaTouched: false,
            };
        };

        sheet.current?.addEventListener("touchstart", handleTouchStart);
        sheet.current?.addEventListener("touchmove", handleTouchMove);
        sheet.current?.addEventListener("touchend", handleTouchEnd);
    }, [isBottomSheetExpanded]);

    useEffect(() => {
        const handleTouchStart = () => {
            metrics.current.isContentAreaTouched = true;
        };
        content.current?.addEventListener("touchstart", handleTouchStart);
    }, []);

    return { sheet, content };
}

