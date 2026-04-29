-- ============================
-- TABLA: puestos
-- ============================
-- Representa el organigrama.
-- La relación parent_id permite recursividad infinita.

CREATE TABLE puestos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    parent_id INT DEFAULT NULL,
    descripcion TEXT,
    CONSTRAINT fk_puesto_padre
        FOREIGN KEY (parent_id)
        REFERENCES puestos(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE INDEX idx_puestos_parent_id ON puestos(parent_id);

-- ============================
-- TABLA: usuarios
-- ============================

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    puesto_id INT NOT NULL,
    activo TINYINT(1) DEFAULT 1,
    CONSTRAINT fk_usuario_puesto
        FOREIGN KEY (puesto_id)
        REFERENCES puestos(id)
        ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ============================
-- TABLA: eventos_calendario
-- ============================

CREATE TABLE eventos_calendario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATETIME NOT NULL,
    duracion_minutos INT NOT NULL,
    estado VARCHAR(30) NOT NULL,
    usuario_id INT DEFAULT NULL,
    puesto_id INT DEFAULT NULL,
    CONSTRAINT fk_evento_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_evento_puesto
        FOREIGN KEY (puesto_id)
        REFERENCES puestos(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE INDEX idx_eventos_fecha_inicio ON eventos_calendario(fecha_inicio);