import { useRecoilState } from "recoil";
import { socket } from "../config/socket";

export default function useSocket() {
    const onGiveNotice = (msg) => {
        console.log(msg);
        socket.on("notice", () => {
            console.log(msg);
        });
    };

    return { onGiveNotice };
}

