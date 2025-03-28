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

    fetch(`http://localhost:8080/api/lend/${id}`)
      .then((res) => res.json())
      .then((data) => {
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

  const istmeTähestik = ["A", "B", "C", "D", "E", "F"];
  const read = 15; // 15 rida

  return (
    <div>
      {lend ? (
        <>
          <h1>Lend {lend.alguskoht} → {lend.sihtkoht}</h1>
          <p>
            {lend.alguskoht} → {lend.sihtkoht} ({lend.kuupaev})<br />
            Lennufirma: {lend.lennufirma}<br />
            Hind: {lend.hind}€<br />
            Lennu aeg: {lend.lennuaeg} tundi
          </p>

          <h2>Istmeplaan</h2>
          <svg width="500" height="800">
            {Array.from({ length: read }).map((_, rowIndex) =>
              istmeTähestik.map((col, colIndex) => {
                const iste = kohad.find(
                  (iste) => iste.reanumber === rowIndex + 1 && iste.istmetaht === col
                );

                const x = (col === "D" || col == "E" || col == "F") ? colIndex * 50 + 30 : colIndex * 50;

                const y = rowIndex * 50;

                return (
                  <g key={`${rowIndex}-${col}`}>
                    <rect
                      x={x}
                      y={y}
                      width="40"
                      height="40"
                      rx="8"
                      ry="8"
                      stroke="black"
                      strokeWidth="2"
                      fill={iste ? (iste.kasvaba ? "lightgreen" : "red") : "lightgreen"}
                    />
                    <text x={x + 20} y={y + 25} textAnchor="middle" fontSize="12">
                      {rowIndex + 1}{col}
                    </text>
                  </g>
                );
              })
            )}
          </svg>
        </>
      ) : (
        <p>Laen andmeid...</p>
      )}
    </div>
  );
}
