"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Iste = {
  id: number;
  reanumber: number;
  istmetaht: string;
  kasvaba: boolean;
};

type Lend = {
  id: number;
  sihtkoht: string;
  alguskoht: string;
  lennuaeg: number;
  kuupaev: string;
  hind: number;
  lennufirma: string;
};

export default function LendDetail() {
  const pathname = usePathname();
  const id = pathname.split('/')[2];
  const [kohad, setKohad] = useState<Iste[]>([]);
  const [lend, setLend] = useState<Lend | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8080/api/lend/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLend(data.lend);
        setKohad(data.kohad || []);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  return (
    <div>
      {lend && (
        <>
          <h1>Lend {lend.alguskoht} → {lend.sihtkoht}</h1>
          <div>
            <h2>Lennu info</h2>
            <p>
              {lend.alguskoht} → {lend.sihtkoht} ({lend.kuupaev})<br />
              Lennufirma: {lend.lennufirma}<br />
              Hind: {lend.hind}€<br />
              Lennu aeg: {lend.lennuaeg} tundi
            </p>
          </div>
          <h2>Istmeplaan</h2>
          <ul>
            {kohad.map((iste) => (
              <li key={iste.id}>
                Rida: {iste.reanumber}, Koht: {iste.istmetaht}, Hõivatud: {iste.kasvaba ? "Jah" : "Ei"}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
