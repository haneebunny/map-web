import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import io from "socket.io-client";
import {
    onChatMessage,
    onConnect,
    onDisconnect,
    onGiveNotice,
} from "../src/common/api/socket";
import { noticeList } from "../src/common/store/atom";

export default function MySocket() {
    const [socket, setSocket] = useState(null);
    const [noticeState, setNoticeState] = useRecoilState(noticeList);

    useEffect(() => {
        const socket = io("http://localhost:4000");

        socket.connect();

        setSocket(socket);

        socket.on("connect", onConnect);

        socket.on("disconnect", onDisconnect);

        socket.on("chat message", onChatMessage);

        socket.on("notice", onNotice);

        return () => {
            socket.disconnect();
            socket.off("connect", onConnect);
        };
    }, []);

    const onNotice = (msg) => {
        // 기존 배열 복사
        const updateNotices = [...noticeState];
        updateNotices.unshift(msg);
        // updateNotices.shift();

        setNoticeState(updateNotices);
    };

    return (
        <div>
            <p>
                Socket Connection Status:{" "}
                {noticeState?.map((notice) => (
                    <div>{notice}</div>
                ))}
            </p>
        </div>
    );
}

