import Link from "next/link";
import styles from "../styles/Home.module.css";
import styled from "@emotion/styled";
import MapMarkerPage from "./map/[_id]";

export default function Home() {
    return (
        <div>
            <MapMarkerPage />
        </div>
    );
}

// 최초 로드시 임의의 id부여
// 왜냐면 제가 /map 에서 /map/_id 로 이동할 때 페이지를 따로 쓰고 데이터도 다시 불러오고 깜빡이는 문제를 해결하지 못 했기 때문입니다.

const Wrapper = styled.div`
    background-color: cornflowerblue;
    font-size: large;
`;

