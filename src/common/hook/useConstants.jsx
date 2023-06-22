// export const MIN_Y = 60; // 바텀시트가 최대로 높이 올라갔을 때의 y 값
// export const MAX_Y = window.innerHeight - 80; // 바텀시트가 최소로 내려갔을 때의 y 값
// export const BOTTOM_SHEET_HEIGHT = window.innerHeight - MIN_Y; // 바텀시트의 세로 길이

import { useEffect, useState } from "react";

// console.log(window.innerHeight, MIN_Y);

export function useConstants() {
    const [MIN_Y, setMIN_Y] = useState(60);
    const [MAX_Y, setMAX_Y] = useState();
    const [BOTTOM_SHEET_HEIGHT, setBOTTOM_SHEET_HEIGHT] = useState();

    useEffect(() => {
        if (typeof window !== "undefined") {
            setMAX_Y(window.innerHeight - 80);
            setBOTTOM_SHEET_HEIGHT(window.innerHeight - MIN_Y);
        }
        // or
        if (typeof window === "undefined") return;
    }, []);

    return { MIN_Y, MAX_Y, BOTTOM_SHEET_HEIGHT };
}

