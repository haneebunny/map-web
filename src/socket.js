import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
    process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket = io(URL);

socket.on("connection", () => {
    console.log("연결!!!");
});

socket.on("chat message", function (msg) {
    console.log(msg);
});

