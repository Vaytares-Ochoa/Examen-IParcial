import { useState } from "react";

export default function TaskForm({ onSubmit, onClose, puestos }) {
  const [form, setForm] = useState({
    titulo: "",
    fecha_inicio: "",
    duracion_minutos: "",
    estado: "programado",
    puesto_id: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl w-96 shadow-xl space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">
          Agregar tarea
        </h2>

        <input
          name="titulo"
          placeholder="Título"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <select
          name="puesto_id"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un puesto</option>
          {puestos.map(p => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          name="fecha_inicio"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="duracion_minutos"
          placeholder="Duración (minutos)"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <select
          name="estado"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        >
          <option value="programado">Programado</option>
          <option value="completado">Completado</option>
          <option value="cancelado">Cancelado</option>
        </select>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-full"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}