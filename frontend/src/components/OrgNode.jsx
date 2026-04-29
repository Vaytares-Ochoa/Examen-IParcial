export default function OrgNode({ node }) {
  const {
    puesto,
    carga_trabajo,
    avance_porcentaje,
    subordinados
  } = node;

  return (
    <div className="flex flex-col items-center">
      {/* Tarjeta */}
      <div className="bg-white shadow-md rounded-2xl p-4 w-64 border">
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          {puesto}
        </h3>

        <div className="mt-3 space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-medium">Carga:</span> {carga_trabajo} h
          </p>
          <p>
            <span className="font-medium">Avance:</span>{" "}
            {avance_porcentaje}%
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${avance_porcentaje}%` }}
          />
        </div>
      </div>

      {/* Conector vertical */}
      {subordinados && subordinados.length > 0 && (
        <>
          <div className="w-px h-6 bg-gray-300" />

          {/* Hijos */}
          <div className="flex space-x-6">
            {subordinados.map((child) => (
              <OrgNode key={child.puesto_id} node={child} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
