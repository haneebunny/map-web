import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function SocketPage() {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socket = io("http://localhost:3001");
        setSocket(socket);

        socket.on("connect", () => {
            setIsConnected(true);
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <p>
                Socket Connection Status:{" "}
                {isConnected ? "Connected" : "Disconnected"}
            </p>
        </div>
    );
}

