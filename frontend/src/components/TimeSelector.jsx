const options = [
  { label: "Semanal", value: "semanal" },
  { label: "Quincenal", value: "quincenal" },
  { label: "Mensual", value: "mensual" },
  { label: "Anual", value: "anual" }
];

export default function TimeSelector({ value, onChange }) {
  return (
    <div className="flex justify-center space-x-3 mt-6">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`
            px-4 py-2 rounded-full border text-sm font-medium transition
            ${
              value === opt.value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }
          `}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
