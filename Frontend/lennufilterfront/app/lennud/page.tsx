"use client"; // Määrab, et see komponent jookseb ainult kliendipoolselt.

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./lennud.module.css";

// Lennu tüübi defineerimine
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
  // Hoiab kõiki lende
  const [lennud, setLennud] = useState<Lend[]>([]);

  // Hoiab kasutaja valitud filtreid
  const [filtrid, setFiltrid] = useState({
    alguskoht: "",
    sihtkoht: "",
    kuupaev: "",
    lennuaeg: 0,
    hind: 0,
  });

  // Hoiab filtreeritud lende
  const [filtreeritudLennud, setFiltreeritudLennud] = useState<Lend[]>([]);

  // Andmete laadimine serverist
  useEffect(() => {
    fetch("http://localhost:8080/api/lend") // API kutse backendile
      .then((res) => res.json()) // Vastuse teisendamine JSON-iks
      .then((data) => {
        setLennud(data); // Salvestame kõik lennud
        setFiltreeritudLennud(data); // Alguses näitame kõiki lende
      })
      .catch((err) => console.error("Fetch error:", err)); // Vea logimine
  }, []);

  // Filtreerib lennud vastavalt kasutaja sisestatud filtritele
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

  // Funktsioon, mis uuendab filtreid
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    const numericValue = value ? parseFloat(value) : 0;

    setFiltrid((prevFiltrid) => ({
      ...prevFiltrid,
      [field]: isNaN(numericValue) ? 0 : numericValue,
    }));
  };

  // Funktsioon, mis teisendab lennuaja tundideks ja minutiteks
  const formatLennuAeg = (lennuaeg: number): string => {
    const tunnid = Math.floor(lennuaeg);
    const minutid = Math.round((lennuaeg - tunnid) * 60);
    return `${tunnid}:${minutid < 10 ? "0" + minutid : minutid}`;
  };

  return (
    <div className={styles.container}>
      <h1>Lennud</h1>

      {/* Filtri sisestusväljad */}
      <div className={styles.filters}>
        <div>
          <label>Lähtekoht</label>
          <input
            type="text"
            value={filtrid.alguskoht}
            onChange={(e) => setFiltrid({ ...filtrid, alguskoht: e.target.value })}
          />
        </div>
        <div>
          <label>Sihtkoht</label>
          <input
            type="text"
            value={filtrid.sihtkoht}
            onChange={(e) => setFiltrid({ ...filtrid, sihtkoht: e.target.value })}
          />
        </div>
        <div>
          <label>Kuupäev</label>
          <input
            type="date"
            value={filtrid.kuupaev}
            onChange={(e) => setFiltrid({ ...filtrid, kuupaev: e.target.value })}
          />
        </div>
        <div>
          <label>Lennu aeg (h)</label>
          <input
            type="number"
            value={filtrid.lennuaeg || ""}
            onChange={(e) => handleInputChange(e, "lennuaeg")}
          />
        </div>
        <div>
          <label>Hind (€)</label>
          <input
            type="number"
            value={filtrid.hind || ""}
            onChange={(e) => handleInputChange(e, "hind")}
          />
        </div>
      </div>

      {/* Lennuloend */}
      <ul className={styles.lennudList}>
        {filtreeritudLennud.map((lend) => (
          <li key={lend.id} className={styles.lennuKast}>
            <div className={styles.lennuInfo}>
              <span>{lend.alguskoht} → {lend.sihtkoht}</span>
              <span> Kuupäev: {lend.kuupaev}</span>
              <span>Lennufirma: {lend.lennufirma}</span>
              <span>Lennu aeg: {formatLennuAeg(lend.lennuaeg)}</span>
              <span>Hind: {lend.hind}€</span>
            </div>
            {/* Link konkreetsele lennule */}
            <Link href={`/lennud/${lend.id}`}>
              <button className={styles.nupp}>Vaata kohti</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
