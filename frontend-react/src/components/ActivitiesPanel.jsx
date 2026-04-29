export default function ActivitiesPanel({ puesto, actividades, onClose }) {
  const estadoColor = (estado) => {
    switch (estado) {
      case "completado":
        return "bg-green-100 text-green-700";
      case "programado":
        return "bg-yellow-100 text-yellow-700";
      case "cancelado":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl p-5 z-50 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Actividades – {puesto}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {actividades.length === 0 && (
        <p className="text-gray-500 text-sm">
          No hay actividades en este período.
        </p>
      )}

      <ul className="space-y-3">
        {actividades.map((a, i) => (
          <li key={i} className="border rounded-lg p-3">
            <div className="flex justify-between items-start">
              <p className="font-medium">{a.titulo}</p>
              <span
                className={`text-xs px-2 py-1 rounded-full ${estadoColor(a.estado)}`}
              >
                {a.estado}
              </span>
            </div>

            <p className="text-sm text-gray-500">
              {new Date(a.fecha_inicio).toLocaleDateString()}
            </p>

            <p className="text-sm">
              Duración: <b>{(a.duracion_minutos / 60).toFixed(1)} h</b>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}