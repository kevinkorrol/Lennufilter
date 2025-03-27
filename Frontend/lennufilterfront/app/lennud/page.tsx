"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Lend = {
  id: number;
  sihtkoht: string;
  alguskoht: string;
  lennuaeg: number;
  kuupaev: string;
  hind: number;
  lennufirma: string;
};

export default function LendudeLeht() {
  const [lennud, setLennud] = useState<Lend[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/lend")
      .then((res) => res.json())
      .then((data) => setLennud(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <h1>Lennud</h1>
      <ul>
        {lennud.map((lend) => (
          <li key={lend.id}>
            {lend.alguskoht} → {lend.sihtkoht} ({lend.kuupaev})
            <Link href={`/lennud/${lend.id}`}>
              <button>Vali lend</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
