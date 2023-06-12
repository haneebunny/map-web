import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h2 className="text-3xl font-bold underline">KakaoMap</h2>
      <Link href="/map" className="text-5xl  text-rose-500">
        지도!
      </Link>
    </div>
  );
}
