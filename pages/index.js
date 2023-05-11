import Head from "next/head";
import Image from "next/image";
import KakaoMap from "../src/components/map/Map";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <KakaoMap />
    </div>
  );
}
