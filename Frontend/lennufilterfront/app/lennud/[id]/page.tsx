"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
  const { id } = useParams();
  const [kohad, setKohad] = useState<Iste[]>([]);
  const [lend, setLend] = useState<Lend | null>(null);

  useEffect(() => {
    if (!id) return;

    console.log("Lennu ID:", id);

    fetch(`http://localhost:8080/api/lend/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Saadud andmed:", data);

        if (data.length > 0) {
          setLend(data[0].lend); 
          setKohad(data);        
        } else {
          setLend(null);
          setKohad([]);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  return (
    <div>
      {lend ? (
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
                Rida: {iste.reanumber}, Koht: {iste.istmetaht}, Hõivatud: {iste.kasvaba ? "Ei" : "Jah"}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Laen andmeid...</p>
      )}
    </div>
  );
}
