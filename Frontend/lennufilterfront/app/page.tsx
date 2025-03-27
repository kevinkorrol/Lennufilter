import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Lennufiltreerija</h1>
      <h2>Kevin Markus Korrol - CGI 2025</h2>
      <Link href="/lennud">Vaata lende</Link>
    </main>
  
  )
}
