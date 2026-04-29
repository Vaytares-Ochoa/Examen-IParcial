export default function OrgNode({ node, onSelect }) {
  return (
    <div className="flex flex-col items-center">
      {/* Tarjeta del puesto */}
      <div
        className="org-card cursor-pointer"
        onClick={() => onSelect(node)}
      >
        <h3 className="org-title text-center">
          {node.puesto}
        </h3>

        <div className="mt-2 text-sm">
          <p>
            <b>Carga:</b> {node.carga_trabajo} h
          </p>
          <p>
            <b>Avance:</b> {node.avance_porcentaje}%
          </p>
        </div>

        <div className="progress-track h-2 mt-2">
          <div
            className="progress-bar h-2"
            style={{ width: `${node.avance_porcentaje}%` }}
          />
        </div>
      </div>

      {/* Subordinados */}
      {node.subordinados && node.subordinados.length > 0 && (
        <>
          <div className="w-px h-6 bg-gray-300" />
          <div className="flex gap-6">
            {node.subordinados.map((child) => (
              <OrgNode
                key={child.puesto_id}
                node={child}
                onSelect={onSelect}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}