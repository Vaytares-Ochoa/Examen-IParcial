// ---------------------------------
// Importaciones
// ---------------------------------
const express = require("express");
const db = require("./db");

// ---------------------------------
// Inicialización
// ---------------------------------
const app = express();
app.use(express.json());

// ---------------------------------
// Endpoint de prueba
// ---------------------------------
app.get("/", (req, res) => {
  res.send("✅ Backend activo");
});

// ---------------------------------
// Organigrama con cálculo real de avances
// ---------------------------------
app.get("/api/organigrama/resumen", (req, res) => {
  const { plazo = "mensual" } = req.query;

  const puestosSQL = "SELECT id, nombre, parent_id FROM puestos";

  let filtroFecha = "";
  if (plazo === "semanal") {
    filtroFecha = "AND fecha_inicio >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
  } else if (plazo === "quincenal") {
    filtroFecha = "AND fecha_inicio >= DATE_SUB(NOW(), INTERVAL 15 DAY)";
  } else if (plazo === "mensual") {
    filtroFecha = "AND MONTH(fecha_inicio) = MONTH(NOW()) AND YEAR(fecha_inicio) = YEAR(NOW())";
  } else if (plazo === "anual") {
    filtroFecha = "AND YEAR(fecha_inicio) = YEAR(NOW())";
  }

  const eventosSQL = `
    SELECT puesto_id, duracion_minutos, estado
    FROM eventos_calendario
    WHERE 1=1 ${filtroFecha}
  `;

  // 1️⃣ Obtener puestos
  db.query(puestosSQL, (errPuestos, puestos) => {
    if (errPuestos) {
      console.error("❌ Error al obtener puestos:", errPuestos);
      return res.status(500).json({ error: "Error obteniendo puestos" });
    }

    // 2️⃣ Obtener eventos
    db.query(eventosSQL, (errEventos, eventos) => {
      if (errEventos) {
        console.error("❌ Error al obtener eventos:", errEventos);
        return res.status(500).json({ error: "Error obteniendo eventos" });
      }

      // 3️⃣ Construir árbol + métricas
      const buildTree = (parentId = null) => {
        return puestos
          .filter(p => p.parent_id === parentId)
          .map(p => {
            // Eventos directos del puesto
            const eventosPuesto = eventos.filter(e => e.puesto_id === p.id);

            const horasTotales = eventosPuesto.reduce(
              (sum, e) => sum + e.duracion_minutos / 60,
              0
            );

            const horasCompletadas = eventosPuesto
              .filter(e => e.estado === "completado")
              .reduce(
                (sum, e) => sum + e.duracion_minutos / 60,
                0
              );

            // Subordinados
            const hijos = buildTree(p.id);

            const horasHijos = hijos.reduce(
              (sum, h) => sum + h.carga_trabajo,
              0
            );

            const completadoHijos = hijos.reduce(
              (sum, h) => sum + h.completado_horas,
              0
            );

            const cargaTotal = horasTotales + horasHijos;
            const completadoTotal = horasCompletadas + completadoHijos;

            const avance =
              cargaTotal === 0
                ? 0
                : Math.round((completadoTotal / cargaTotal) * 100);

            return {
              puesto_id: p.id,
              puesto: p.nombre,
              carga_trabajo: Number(cargaTotal.toFixed(1)),
              completado_horas: Number(completadoTotal.toFixed(1)),
              avance_porcentaje: avance,
              subordinados: hijos
            };
          });
      };

      const organigrama = buildTree();
      res.json(organigrama);
    });
  });
});

// ---------------------------------
// Guardar eventos del calendario
// ---------------------------------
app.post("/api/eventos", (req, res) => {
  const {
    titulo,
    fecha_inicio,
    duracion_minutos,
    estado,
    puesto_id
  } = req.body;

  if (!titulo || !fecha_inicio || !duracion_minutos || !estado || !puesto_id) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const sql = `
    INSERT INTO eventos_calendario
    (titulo, fecha_inicio, duracion_minutos, estado, puesto_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [titulo, fecha_inicio, duracion_minutos, estado, puesto_id],
    (err, result) => {
      if (err) {
        console.error("❌ Error al guardar evento:", err);
        return res.status(500).json({ error: "Error al guardar evento" });
      }

      res.status(201).json({
        mensaje: "✅ Evento guardado correctamente",
        id: result.insertId
      });
    }
  );
});

app.get("/api/eventos/puesto/:id", (req, res) => {
  const { id } = req.params;
  const { plazo = "mensual" } = req.query;

  let filtroFecha = "";
  if (plazo === "semanal") {
    filtroFecha = "AND fecha_inicio >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
  } else if (plazo === "quincenal") {
    filtroFecha = "AND fecha_inicio >= DATE_SUB(NOW(), INTERVAL 15 DAY)";
  } else if (plazo === "mensual") {
    filtroFecha = "AND MONTH(fecha_inicio) = MONTH(NOW()) AND YEAR(fecha_inicio) = YEAR(NOW())";
  } else if (plazo === "anual") {
    filtroFecha = "AND YEAR(fecha_inicio) = YEAR(NOW())";
  }

  const sql = `
    SELECT titulo, fecha_inicio, duracion_minutos, estado
    FROM eventos_calendario
    WHERE puesto_id = ?
    ${filtroFecha}
    ORDER BY fecha_inicio DESC
  `;

  db.query(sql, [id], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error obteniendo eventos" });
    }
    res.json(rows);
  });
});

// ---------------------------------
// Arranque del servidor
// ---------------------------------
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ Backend ejecutándose en http://localhost:${PORT}`);
});