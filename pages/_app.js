import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RecoilRoot>
                    <Component {...pageProps} />
                </RecoilRoot>
            </QueryClientProvider>
        </>
    );
}

export default MyApp;

