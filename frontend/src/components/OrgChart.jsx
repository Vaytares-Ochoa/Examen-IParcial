import OrgNode from "./OrgNode";

export default function OrgChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-gray-500 text-center">
        No hay datos para mostrar
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-8">
      <div className="flex flex-col items-center space-y-6">
        {data.map((rootNode) => (
          <OrgNode key={rootNode.puesto_id} node={rootNode} />
        ))}
      </div>
    </div>
  );
}
