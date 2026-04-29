import { useEffect, useState } from "react";
import OrgChart from "./components/OrgChart";
import TimeSelector from "./components/TimeSelector";

import "./styles/theme.css";
import "./styles/animations.css";

export default function App() {
  const [plazo, setPlazo] = useState("mensual");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔄 Carga de datos cada vez que cambia el plazo
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(`/api/organigrama/resumen?plazo=${plazo}`)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [plazo]);

  return (
    <div className="min-h-screen px-6 pb-10">
      {/* Header */}
      <header className="pt-8 text-center">
        <h1 className="text-3xl font-semibold text-[var(--color-midnight-blue)]">
          Organigrama & Calendario
        </h1>
        <p className="mt-2 text-sm org-muted">
          Vista jerárquica con carga y avance por período
        </p>
      </header>

      {/* Selector de tiempo */}
      <TimeSelector value={plazo} onChange={setPlazo} />

      {/* Contenido principal */}
      <main className="relative mt-8">
        {loading && (
          <div className="flex justify-center items-center mt-16 fade-enter-active">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--color-midnight-blue)] rounded-full animate-spin" />
              <span className="text-sm text-gray-500">
                Actualizando datos…
              </span>
            </div>
          </div>
        )}

        {!loading && (
          <div className="fade-enter-active">
            <OrgChart data={data} />
          </div>
        )}
      </main>
    </div>
  );
}
