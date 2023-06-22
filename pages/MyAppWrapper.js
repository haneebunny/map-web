import App from "next/app";
import { RecoilRoot } from "recoil";
import MyApp from "./_app";

function MyAppWrapper({ children }) {
    return (
        <>
            <RecoilRoot>
                <MyApp>{children}</MyApp>
            </RecoilRoot>
        </>
    );
}

export default MyAppWrapper;

