"use client";
import ReactDOM from 'react-dom/client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./id.module.css";

declare global {
  interface Window {
    svgRoot?: ReactDOM.Root; // svgRoot can be of type ReactDOM.Root (from React 18+)
  }
}

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

  // Filtrite seisund
  const [filters, setFilters] = useState({

    windowSeat: false,    // A või F
    moreSpace: false,     // C või D
    nearExit: false,      // Read 1-5 ja 11-15
    nextToEachOther: null // Kõrvuti olevate kohtade arv
  });

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

  // Kontrollime, kas iste vastab filtrile
  const filterSeats = (iste: Iste) => {
    console.log("filter")
    const { windowSeat, moreSpace, nearExit, nextToEachOther } = filters;

    // Akna all (A või F)
    const isWindowSeat = windowSeat && (iste.istmetaht === "A" || iste.istmetaht === "F");

    // Rohkem ruumi (C või D)
    const isMoreSpace = moreSpace && (iste.istmetaht === "C" || iste.istmetaht === "D");

    // Lähedal väljapääsule (read 1-5 ja 11-15)
    const isNearExit = nearExit && (iste.reanumber <= 5 || (iste.reanumber >= 11 && iste.reanumber <= 15));

    // Kõrvuti olevate kohtade kontrollimine (kui määratud)
    const isNextToEachOther = nextToEachOther && nextToEachOther > 0 && isAdjacentSeats(iste, nextToEachOther);

    return isWindowSeat || isMoreSpace || isNearExit || isNextToEachOther;
  };

  // Kõrvuti kohtade leidmine
  const isAdjacentSeats = (iste: Iste, requiredAdjacentSeats: number) => {
    // Otsime kõrvuti olevaid kohti samal real
    const sameRowSeats = kohad.filter(
      (k) => k.reanumber === iste.reanumber && k.kasvaba
    );

    // Filtreerime järjestatud kohti (kõrvuti)
    const sortedSeats = sameRowSeats.map((k) => k.istmetaht).sort();

    let adjacentSeats = 0;

    for (let i = 0; i < sortedSeats.length - 1; i++) {
      if (istmeTähestik.indexOf(sortedSeats[i]) + 1 === istmeTähestik.indexOf(sortedSeats[i + 1])) {
        adjacentSeats += 1;
      }
    }

    return adjacentSeats >= requiredAdjacentSeats;
  };

  const formatLennuAeg = (lennuaeg: number): string => {
    const tunnid = Math.floor(lennuaeg); // Täisarv osa ehk tunnid
    const minutid = Math.round((lennuaeg - tunnid) * 60); // Kümnendmurd osa teisendada minutiteks
    return `${tunnid}:${minutid < 10 ? "0" + minutid : minutid}`; // Kui minutid on ühekohalised, siis lisame ette nulli

  };

 
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
  
    // Update filters state
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value === "" ? null : parseInt(value),
    }));
  
    // Get the SVG container
    const svgContainer = document.getElementById("istmeplaan");
  
    if (svgContainer) {
      // Initialize React root only once
      if (!window.svgRoot) {
        window.svgRoot = ReactDOM.createRoot(svgContainer);
      }
  
      // Update the existing root with new SVG
      window.svgRoot.render(buildsvg());
    }
  };
  
  

  

  const buildsvg = () => {
    return (
      <svg width="500" height="800">
            {Array.from({ length: read }).map((_, rowIndex) =>
              istmeTähestik.map((col, colIndex) => {
                const iste = kohad.find(
                  (iste) => iste.reanumber === rowIndex + 1 && iste.istmetaht === col
                );

                const x = (col === "D" || col === "E" || col === "F") ? colIndex * 50 + 30 : colIndex * 50 + 1;
                const y = rowIndex * 50 + 10;

                const fillColor = iste ? (iste.kasvaba && filterSeats(iste) ? "lightblue" : (iste.kasvaba ? "lightgreen" : "red")) : "lightgreen";

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
                      fill={fillColor}
                    />
                    <text x={x + 20} y={y + 25} textAnchor="middle" fontSize="12">
                      {rowIndex + 1}{col}
                    </text>
                  </g>
                );
              })
            )}
          </svg>
    )
  }

  return (
    <div>
      {lend ? (
        <div className={styles.container}>
        <div className={styles.lennuInfo}>
          <p>
            {lend.alguskoht} → {lend.sihtkoht} ({lend.kuupaev})&nbsp;
            Lennufirma: {lend.lennufirma}&nbsp;
            Hind: {lend.hind}€&nbsp;
            Lennu aeg: {formatLennuAeg(lend.lennuaeg)}
          </p>
        </div>
      
        <div className={styles.content}>
          <div id="istmeplaan" className={styles.istmeplaan}>
            {buildsvg()}
          </div>
      
          <div className={styles.filters}>
            <h3>Vali filtrid:</h3>
            <label>
              Akna all:
              <input type="checkbox" name="windowSeat" checked={filters.windowSeat} onChange={handleFilterChange} />
            </label>
            <label>
              Rohkem ruumi:
              <input type="checkbox" name="moreSpace" checked={filters.moreSpace} onChange={handleFilterChange} />
            </label>
            <label>
              Lähedal väljapääsule:
              <input type="checkbox" name="nearExit" checked={filters.nearExit} onChange={handleFilterChange} />
            </label>
            <label>
              Mitu kõrvuti kohta: 
              <input type="number" name="nextToEachOther" value={filters.nextToEachOther || ""} onChange={handleFilterChange} min="0" />
            </label>
          </div>
        </div>
      </div>
      
      ) : ( <p>Laen andmeid...</p>
      )}
    </div>
  );
}
