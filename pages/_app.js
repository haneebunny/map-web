import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                </QueryClientProvider>
            </RecoilRoot>
        </>
    );
}

export default MyApp;

