// ------------------------------
// Datos simulados (normalmente vienen de BD)
// ------------------------------
function daysAgo(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

const puestos = [
  { id: 1, nombre: "Director General", parent_id: null },
  { id: 2, nombre: "Gerente de Tecnología", parent_id: 1 },
  { id: 3, nombre: "Gerente Administrativo", parent_id: 1 },

  { id: 4, nombre: "Líder Backend", parent_id: 2 },
  { id: 5, nombre: "Líder Frontend", parent_id: 2 },

  { id: 6, nombre: "Analista Contable", parent_id: 3 },
  { id: 7, nombre: "Recursos Humanos", parent_id: 3 }
];

const tareas = [
    {
        puesto_id: 4,
        fecha: '2026-03-10',
        estimado_horas: 40,
        completado_horas: 30
    },
    {
        puesto_id: 4,
        fecha: '2026-03-20',
        estimado_horas: 20,
        completado_horas: 20
    },
    {
        puesto_id: 6,
        fecha: '2026-09-01',
        estimado_horas: 30,
        completado_horas: 10
    },
    {
        puesto_id: 5,
        fecha: '2026-06-15',
        estimado_horas: 50,
        completado_horas: 25
    },
    {
        puesto_id: 4,
        fecha: "2026-04-10",
        estimado_horas: 40,
        completado_horas: 30
    },
    {
        puesto_id: 4,
        fecha: "2026-04-20",
        estimado_horas: 20,
        completado_horas: 20
    },
    
{
    puesto_id: 4,
    fecha: daysAgo(2), // ESTA SEMANA ✅
    estimado_horas: 8,
    completado_horas: 6
  },
  {
    puesto_id: 4,
    fecha: daysAgo(5), // ESTA SEMANA ✅
    estimado_horas: 6,
    completado_horas: 6
  },

  // Frontend
  {
    puesto_id: 5,
    fecha: daysAgo(1), // ESTA SEMANA ✅
    estimado_horas: 5,
    completado_horas: 3
  },

  // Contabilidad
  {
    puesto_id: 6,
    fecha: daysAgo(12), // QUINCENAL
    estimado_horas: 10,
    completado_horas: 4
  },

  // RRHH
  {
    puesto_id: 7,
    fecha: daysAgo(20), // MENSUAL
    estimado_horas: 6,
    completado_horas: 2
  },

    // Frontend
    {
        puesto_id: 5,
        fecha: "2026-04-15",
        estimado_horas: 30,
        completado_horas: 15
    },
    {
        puesto_id: 5,
        fecha: "2026-03-10",
        estimado_horas: 25,
        completado_horas: 25
    },

    // Contabilidad
    {
        puesto_id: 6,
        fecha: "2026-02-01",
        estimado_horas: 20,
        completado_horas: 10
    },
    {
        puesto_id: 6,
        fecha: "2026-01-15",
        estimado_horas: 15,
        completado_horas: 15
    },

    // RRHH
    {
        puesto_id: 7,
        fecha: "2026-04-05",
        estimado_horas: 10,
        completado_horas: 5
    }
];

// ------------------------------
// Utilidades de fechas
// ------------------------------

function isWithinPeriod(dateStr, plazo) {
    const date = new Date(dateStr);
    const now = new Date();

    switch (plazo) {
        
    case 'semanal':
        return date >= startOfWeek(now) && date <= now;
    case 'quincenal': {
        const start = new Date(now);
        start.setDate(now.getDate() - 15);
        return date >= start && date <= now;
    }
    case 'mensual':
        return date.getMonth() === now.getMonth()
            && date.getFullYear() === now.getFullYear();
    case 'anual':
        return date.getFullYear() === now.getFullYear();
            
    }
}

function startOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay() || 7;
    if (day !== 1) d.setHours(-24 * (day - 1));
    return d;
}

// ------------------------------
// Agregación recursiva
// ------------------------------

function buildTree(parentId = null) {
    return puestos
        .filter(p => p.parent_id === parentId)
        .map(p => ({
            ...p,
            children: buildTree(p.id)
        }));
}

function aggregateNode(node, plazo) {
    const tareasNodo = tareas.filter(
        t => t.puesto_id === node.id && isWithinPeriod(t.fecha, plazo)
    );

    let estimado = tareasNodo.reduce((sum, t) => sum + t.estimado_horas, 0);
    let completado = tareasNodo.reduce((sum, t) => sum + t.completado_horas, 0);

    const hijos = node.children.map(child => aggregateNode(child, plazo));

    // ✅ SUMA DE SUBORDINADOS
    hijos.forEach(hijo => {
        estimado += hijo.carga_trabajo;
        completado += hijo.completado_horas;
    });

    const avance = estimado === 0
        ? 0
        : Math.round((completado / estimado) * 100);

    return {
        puesto_id: node.id,
        puesto: node.nombre,
        carga_trabajo: estimado,
        completado_horas: completado,
        avance_porcentaje: avance,
        subordinados: hijos
    };
}

// ------------------------------
// Exportación COMMONJS (Node)
// ------------------------------

async function aggregateByPeriod(plazo) {
    const arbol = buildTree();
    return arbol.map(root => aggregateNode(root, plazo));
}

module.exports = {
    aggregateByPeriod
};