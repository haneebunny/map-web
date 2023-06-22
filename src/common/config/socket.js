import io from "socket.io-client";
import { host } from "./server";

export const socket = io(host, {
    reconnectionDelay: 3000,
});

