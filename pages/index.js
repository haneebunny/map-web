import Head from "next/head";
import Image from "next/image";
import Map from "../src/components/map/Map";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h2 className="text-3xl font-bold underline">KakaoMap</h2>
      <Map />
    </div>
  );
}
