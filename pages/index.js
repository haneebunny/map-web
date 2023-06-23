import Link from "next/link";
import styles from "../styles/Home.module.css";
import styled from "@emotion/styled";

export default function Home() {
    return (
        <div className={styles.container}>
            <h2 className="text-3xl font-bold underline">KakaoMap</h2>
            <Link href="/map/hi" className="text-5xl  text-blue-500">
                지도!
            </Link>
            <Wrapper>안녕안녕</Wrapper>
        </div>
    );
}

// 최초 로드시 임의의 id부여
// 왜냐면 제가 /map 에서 /map/_id 로 이동할 때 페이지를 따로 쓰고 데이터도 다시 불러오고 깜빡이는 문제를 해결하지 못 했기 때문입니다.

const Wrapper = styled.div`
    background-color: cornflowerblue;
    font-size: large;
`;

