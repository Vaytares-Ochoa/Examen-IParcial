import OrgNode from "./OrgNode";

export default function OrgChart({ data, onSelect }) {
  return (
    <div className="flex justify-center mt-8">
      <div className="flex flex-col items-center space-y-6">
        {data.map((node) => (
          <OrgNode
            key={node.puesto_id}
            node={node}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}