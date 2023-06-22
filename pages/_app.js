import { RecoilRoot, useRecoilState } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const queryClient = new QueryClient();

import "../styles/globals.css";
import {
    handleNoticeMessage,
    notifyGiveNotice,
    onChatMessage,
    onConnect,
    onDisconnect,
} from "../src/common/api/socket";
import { Events } from "../src/components/socket/Events";
import useSocket from "../src/common/hook/useSocket";
import App from "next/app";
import { noticeMessage } from "../src/common/store/atom";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RecoilRoot>
                    <Events />
                    <Component {...pageProps} />
                </RecoilRoot>
            </QueryClientProvider>
        </>
    );
}

export default MyApp;

