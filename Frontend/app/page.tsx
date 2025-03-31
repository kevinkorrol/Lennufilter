import styles from "./page.module.css";
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.page}>
      <h1>Lennufiltreerija</h1>
      <h2>Kevin Markus Korrol - CGI 2025</h2>
      <Link href="/lennud">
        <button className={styles.nupp}>Vaata lende</button>
      </Link>

    </main>
  )
}
