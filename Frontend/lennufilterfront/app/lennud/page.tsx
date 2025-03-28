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
  const [filtrid, setFiltrid] = useState({
    alguskoht: "",
    sihtkoht: "",
    kuupaev: "",
    lennuaeg: 0,
    hind: 0,
  });
  const [filtreeritudLennud, setFiltreeritudLennud] = useState<Lend[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/lend")
      .then((res) => res.json())
      .then((data) => {
        setLennud(data);
        setFiltreeritudLennud(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {

    setFiltreeritudLennud(
      lennud.filter((lend) => {
        return (
          (filtrid.alguskoht ? lend.alguskoht.includes(filtrid.alguskoht) : true) &&
          (filtrid.sihtkoht ? lend.sihtkoht.includes(filtrid.sihtkoht) : true) &&
          (filtrid.kuupaev ? lend.kuupaev === filtrid.kuupaev : true) &&
          (filtrid.lennuaeg ? lend.lennuaeg <= filtrid.lennuaeg : true) &&
          (filtrid.hind ? lend.hind <= filtrid.hind : true)
        );
      })
    );
  }, [filtrid, lennud]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;


    const numericValue = value ? parseFloat(value) : 0;

    setFiltrid((prevFiltrid) => ({
      ...prevFiltrid,
      [field]: isNaN(numericValue) ? 0 : numericValue,
    }));
  };

  const formatLennuAeg = (lennuaeg: number): string => {
    const tunnid = Math.floor(lennuaeg); // Täisarv osa ehk tunnid
    const minutid = Math.round((lennuaeg - tunnid) * 60); // Kümnendmurd osa teisendada minutiteks
    return `${tunnid}:${minutid < 10 ? "0" + minutid : minutid}`; // Kui minutid on ühekohalised, siis lisame ette nulli

  };

  return (
    <div>
      <h1>Lennud</h1>

      <div>
        <h2>Filtreeri lennud</h2>
        <div>
          <label>Lähtekoht: </label>
          <input
            type="text"
            value={filtrid.alguskoht}
            onChange={(e) => setFiltrid({ ...filtrid, alguskoht: e.target.value })}
          />
        </div>
        <div>
          <label>Sihtkoht: </label>
          <input
            type="text"
            value={filtrid.sihtkoht}
            onChange={(e) => setFiltrid({ ...filtrid, sihtkoht: e.target.value })}
          />
        </div>
        <div>
          <label>Kuupäev: </label>
          <input
            type="date"
            value={filtrid.kuupaev}
            onChange={(e) => setFiltrid({ ...filtrid, kuupaev: e.target.value })}
          />
        </div>
        <div>
          <label>Lennu aeg (tundi): </label>
          <input
            type="number"
            value={filtrid.lennuaeg || ""}
            onChange={(e) => handleInputChange(e, "lennuaeg")}
          />
        </div>
        <div>
          <label>Hind (€): </label>
          <input
            type="number"
            value={filtrid.hind || ""}
            onChange={(e) => handleInputChange(e, "hind")}
          />
        </div>
      </div>

      <ul>
        {filtreeritudLennud.map((lend) => (
          <li key={lend.id}>
            {lend.alguskoht} → {lend.sihtkoht} ({lend.kuupaev})<br />
            Lennufirma: {lend.lennufirma}, Lennu aeg: {formatLennuAeg(lend.lennuaeg)}, Hind: {lend.hind}€
            <br />
            <Link href={`/lennud/${lend.id}`}>
              <button>Vali lend</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
