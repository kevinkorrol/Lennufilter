import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.page}>
      <h1>Lennufiltreerija</h1>
      <h2>Kevin Markus Korrol - CGI 2025</h2>
      <div className={styles.ctas}>
        <a href="/lennud" className={styles.primary}>Vaata lende</a>
      </div>
    </main>
  )
}
