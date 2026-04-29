import { useEffect, useState } from "react";
import OrgChart from "./components/OrgChart";
import TimeSelector from "./components/TimeSelector";
import TaskForm from "./components/TaskForm";
import ActivitiesPanel from "./components/ActivitiesPanel";

import "./styles/theme.css";
import "./styles/animations.css";

export default function App() {
  const [plazo, setPlazo] = useState("mensual");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [puestos, setPuestos] = useState([]);

  const [selectedNode, setSelectedNode] = useState(null);
  const [actividades, setActividades] = useState([]);

  // 🔄 Cargar organigrama cuando cambia el plazo
  useEffect(() => {
    setLoading(true);

    fetch(`/api/organigrama/resumen?plazo=${plazo}`)
      .then(res => res.json())
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [plazo]);

  // 📌 Puestos (usados por el formulario)
  useEffect(() => {
    setPuestos([
      { id: 1, nombre: "Director General" },
      { id: 2, nombre: "Gerente de Tecnología" },
      { id: 3, nombre: "Gerente Administrativo" },
      { id: 4, nombre: "Líder Backend" },
      { id: 5, nombre: "Líder Frontend" },
      { id: 6, nombre: "Analista Contable" },
      { id: 7, nombre: "Recursos Humanos" }
    ]);
  }, []);

  return (
    <>
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
            <div className="flex justify-center items-center mt-16">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-700 rounded-full animate-spin" />
                <span className="text-sm text-gray-500">
                  Actualizando datos…
                </span>
              </div>
            </div>
          )}

          {!loading && (
            <OrgChart
              data={data}
              onSelect={(node) => {
                setSelectedNode(node);
                fetch(`/api/eventos/puesto/${node.puesto_id}?plazo=${plazo}`)
                  .then(res => res.json())
                  .then(setActividades);
              }}
            />
          )}
        </main>
      </div>

      {/* Botón flotante */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg"
      >
        + Agregar tarea
      </button>

      {/* Modal formulario */}
      {showForm && (
        <TaskForm
          puestos={puestos}
          onClose={() => setShowForm(false)}
          onSubmit={(formData) => {
            fetch("/api/eventos", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData)
            }).then(() => {
              alert("✅ Tarea agregada correctamente");
              setShowForm(false);
            });
          }}
        />
      )}

      {/* Panel de actividades */}
      {selectedNode && (
        <ActivitiesPanel
          puesto={selectedNode.puesto}
          actividades={actividades}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </>
  );
}