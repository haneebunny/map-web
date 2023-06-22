import io from "socket.io-client";
import { useRecoilState } from "recoil";
import { noticeMessage } from "../store/atom";

const socket = io("http://localhost:4000");

export const onConnect = () => {
    console.log("connected");
};

export const onDisconnect = () => {
    console.log("disconnected");
};

export const onChatMessage = (data) => {
    console.log("chat::", data);
};

export const onGiveNotice = (msg) => {
    console.log(msg);
    console.log("nonononotice");
    // const [message, setMessage] = useRecoilState(noticeMessage);

    // const tempMessage = message;

    // console.log(msg);

    // tempMessage.push(msg);
};

export const notifyGiveNotice = (msg) => {
    console.log(noticeMessage);
    const messageToUpdate = noticeMessage; // 현재 Recoil 상태를 복사
    messageToUpdate.push(msg); // 새로운 메시지를 추가
    noticeMessage.set(messageToUpdate); // Recoil 상태를 업데이트하는 신호 보내기
};

