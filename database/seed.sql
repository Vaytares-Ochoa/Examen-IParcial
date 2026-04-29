-- ============================
-- PUESTOS (Jerarquía 3 niveles)
-- ============================

-- Nivel 1
INSERT INTO puestos (id, nombre, parent_id, descripcion)
VALUES (1, 'Director General', NULL, 'Máxima autoridad');

-- Nivel 2
INSERT INTO puestos (id, nombre, parent_id, descripcion)
VALUES
(2, 'Gerente de Tecnología', 1, 'Área tecnológica'),
(3, 'Gerente Administrativo', 1, 'Área administrativa');

-- Nivel 3
INSERT INTO puestos (id, nombre, parent_id, descripcion)
VALUES
(4, 'Líder de Backend', 2, 'Servicios y datos'),
(5, 'Líder de Frontend', 2, 'Interfaces de usuario'),
(6, 'Analista Contable', 3, 'Contabilidad');

-- ============================
-- USUARIOS
-- ============================

INSERT INTO usuarios (nombre, email, puesto_id, activo)
VALUES
('Ana Rodríguez', 'ana@empresa.com', 1, 1),
('Carlos Gómez', 'carlos@empresa.com', 2, 1),
('Lucía Pérez', 'lucia@empresa.com', 4, 1),
('Mario López', 'mario@empresa.com', 6, 1);

-- ============================
-- EVENTOS (Repartidos en un año)
-- ============================

INSERT INTO eventos_calendario
(titulo, descripcion, fecha_inicio, duracion_minutos, estado, usuario_id, puesto_id)
VALUES
('Planificación Anual', 'Definición de objetivos del año', '2026-01-10 09:00:00', 180, 'completado', 1, 1),
('Revisión Q1 Backend', 'Evaluación de arquitectura', '2026-03-15 10:00:00', 120, 'completado', 3, 4),
('Capacitación Frontend', 'Nuevas prácticas UI', '2026-06-20 14:00:00', 240, 'programado', NULL, 5),
('Auditoría Interna', 'Revisión contable semestral', '2026-09-05 08:30:00', 180, 'programado', 4, 6),
('Cierre Anual', 'Resultados y métricas finales', '2026-12-18 16:00:00', 120, 'programado', 1, 1);