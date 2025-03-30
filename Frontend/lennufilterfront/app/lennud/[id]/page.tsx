"use client";
import ReactDOM from 'react-dom/client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./id.module.css";
import { SourceTextModule } from 'vm';

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
    console.log("Filters updated, rebuilding SVG...");
    
    if (!window.svgRoot) {
      const svgContainer = document.getElementById("istmeplaan");
      if (svgContainer) {
        window.svgRoot = ReactDOM.createRoot(svgContainer);
      }
    }
  
    if (window.svgRoot) {
      window.svgRoot.render(buildsvg());
    }
  }, [filters]); // Re-run whenever filters change
  

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
    console.log("filtreerimine")
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
    console.log("Kontrollin kõrvuti kohti:", iste);
  
    // Loome täieliku istmeplaani (kõik võimalikud kohad A - F ja read 1-15)
    const allSeats: Iste[] = [];
    for (let row = 1; row <= read; row++) {
      for (const letter of istmeTähestik) {
        const existingSeat = kohad.find((k) => k.reanumber === row && k.istmetaht === letter);
        // Kui koht on olemas, siis seda muudame, et see oleks hõivatud, kui andmebaasis on
        allSeats.push(existingSeat || { id: -1, reanumber: row, istmetaht: letter, kasvaba: true });
      }
    }
  
    // Leia kõik vabad istmed samal real
    const sameRowSeats = allSeats.filter((k) => k.reanumber === iste.reanumber && k.kasvaba);
  
    // Sorteeri tähestikulises järjekorras
    const sortedSeats = sameRowSeats.map((k) => k.istmetaht).sort((a, b) => 
      istmeTähestik.indexOf(a) - istmeTähestik.indexOf(b)
    );
  
    let adjacentSeats = 0;
    let maxAdjacentSeats = 0;
  
    // Kontrollige järjestikuseid kohti
    for (let i = 0; i < sortedSeats.length; i++) {
      if (i > 0 && istmeTähestik.indexOf(sortedSeats[i]) === istmeTähestik.indexOf(sortedSeats[i - 1]) + 1) {
        adjacentSeats += 1;
      } else {
        adjacentSeats = 1; // Kui ei ole järjestikune, alustame uuesti
      }
  
      // Hoidke maksimaalset järjestikuste kohtade arvu
      maxAdjacentSeats = Math.max(maxAdjacentSeats, adjacentSeats);
    }
  
    console.log(`Leitud kõrvuti kohti: ${maxAdjacentSeats}, nõutud: ${requiredAdjacentSeats}`);
  
    // Tagasta, kas leiti piisavalt kõrvuti kohti
    return maxAdjacentSeats >= requiredAdjacentSeats;
  };
  

  const formatLennuAeg = (lennuaeg: number): string => {
    const tunnid = Math.floor(lennuaeg); // Täisarv osa ehk tunnid
    const minutid = Math.round((lennuaeg - tunnid) * 60); // Kümnendmurd osa teisendada minutiteks
    return `${tunnid}:${minutid < 10 ? "0" + minutid : minutid}`; // Kui minutid on ühekohalised, siis lisame ette nulli

  };

 
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("filterchange")
    const { name, value, type, checked } = e.target;
  
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [name]: type === "checkbox" ? checked : value === "" ? null : parseInt(value),
      };
  
      return newFilters;
    });
  };
  
  


  const buildsvg = () => {
    console.log("BUILDSVG")
    return (
      <svg width="500" height="800">
            {Array.from({ length: read }).map((_, rowIndex) =>
              istmeTähestik.map((col, colIndex) => {
                const iste = kohad.find(
                  (iste) => iste.reanumber === rowIndex + 1 && iste.istmetaht === col
                ) || { id: -1, reanumber: rowIndex + 1, istmetaht: col, kasvaba: true };

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
