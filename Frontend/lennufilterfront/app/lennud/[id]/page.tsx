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
  const [aknaAll, setAknaAll] = useState(false);
  const [ruumiga, setRuumiga] = useState(false);
  const [lähimVäljapääs, setLähimVäljapääs] = useState(false);
  const [kõrvuti, setKõrvuti] = useState(0);

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

  const filterKohad = () => {
    const vabadKohad = kohad.filter((iste) => {
      return (
        iste.kasvaba && 
        (aknaAll ? (iste.istmetaht === "A" || iste.istmetaht === "F") : true) &&
        (ruumiga ? (iste.istmetaht === "C" || iste.istmetaht === "D") : true) &&
        (lähimVäljapääs ? (iste.reanumber >= 1 && iste.reanumber <= 5 || iste.reanumber >= 25 && iste.reanumber <= 30) : true) 
      );
    });

    return vabadKohad;
  };

  const findAdjacentSeats = (vabadKohad: Iste[], numIstmeid: number) => {
    const sobivadKohad: Iste[][] = [];

    for (let i = 0; i < vabadKohad.length - numIstmeid + 1; i++) {
      let temp = [vabadKohad[i]];

      for (let j = 1; j < numIstmeid; j++) {
        if (vabadKohad[i + j].kasvaba) {
          temp.push(vabadKohad[i + j]);
        } else {
          break;
        }
      }

      if (temp.length === numIstmeid) {
        sobivadKohad.push(temp);
      }
    }

    return sobivadKohad;
  };

  const kohadFiltreeritud = filterKohad();
  const kõrvutiIstmed = kõrvuti > 0 ? findAdjacentSeats(kohadFiltreeritud, kõrvuti) : [];

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
          <div>
            <h2>Filtrid</h2>
            <label>
              <input
                type="checkbox"
                checked={aknaAll}
                onChange={() => setAknaAll(!aknaAll)}
              />
              Akna all
            </label>
            <label>
              <input
                type="checkbox"
                checked={ruumiga}
                onChange={() => setRuumiga(!ruumiga)}
              />
              Rohkem ruumi
            </label>
            <label>
              <input
                type="checkbox"
                checked={lähimVäljapääs}
                onChange={() => setLähimVäljapääs(!lähimVäljapääs)}
              />
              Lähedal väljapääsule
            </label>
            <label>
              Kõrvuti istmed (sisesta number):
              <input
                type="number"
                value={kõrvuti}
                onChange={(e) => setKõrvuti(Number(e.target.value))}
                min={0}
              />
            </label>
          </div>
          <h2>Istmeplaan</h2>
          <ul>
            {kõrvutiIstmed.length > 0 ? (
              <li>
                Kõrvuti sobivad istmed:
                <ul>
                  {kõrvutiIstmed.map((kohaGrupp, index) => (
                    <li key={index}>
                      {kohaGrupp.map((iste) => (
                        <span key={iste.id}>{iste.reanumber}{iste.istmetaht} </span>
                      ))}
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li>Kõrvuti istmeid ei leitud</li>
            )}
            {kohadFiltreeritud.length > 0 ? (
              kohadFiltreeritud.map((iste) => (
                <li key={iste.id}>
                  Rida {iste.reanumber}, Koht {iste.istmetaht}, {iste.kasvaba ? "Vaba" : "Hõivatud"}
                </li>
              ))
            ) : (
              <p>Ei leitud vabu kohti vastavalt valitud filtritele.</p>
            )}
          </ul>
        </>
      ) : (
        <p>Laen andmeid...</p>
      )}
    </div>
  );
}
