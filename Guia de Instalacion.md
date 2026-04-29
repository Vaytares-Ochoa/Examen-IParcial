

# 📘 GUÍA DE INSTALACIÓN Y USO

**Sistema de Organigrama Dinámico con Calendario**

***

## 1️⃣ Requisitos del sistema

Antes de comenzar, asegúrate de tener instalado lo siguiente:

###  Software necesario

| Herramienta          | Descripción                      |
| -------------------- | -------------------------------- |
| **Node.js (LTS)**    | Para ejecutar backend y frontend |
| **XAMPP**            | Incluye MySQL y phpMyAdmin       |
| **Navegador Web**    | Chrome, Edge o Firefox           |
| **Editor de código** | Visual Studio Code (recomendado) |

###  Verificar Node.js

En la terminal (CMD o PowerShell):

```bash
node -v
npm -v
```

Si muestra versiones, Node está listo ✅

***

## 2️⃣ Instalación paso a paso

###  Estructura del proyecto

El proyecto está organizado así:

    Examen-IParcial/
    │
    ├── backend/
    │   ├── server.js
    │   └── db.js
    │
    ├── frontend-react/
    │   └── src/
    │
    └── database/

***

##  PASO 1: Configurar la base de datos (XAMPP)

### 1.1 Iniciar XAMPP

1.  Abre **XAMPP Control Panel**
2.  Presiona **Start** en:
    *   Apache
    *   MySQL

Ambos deben quedar en color verde 

***

### 1.2 Crear la base de datos

1.  Abre el navegador y entra a:
        http://localhost/phpmyadmin
2.  Haz clic en **Nueva**
3.  Crea una base de datos llamada:

```text
organigrama_db
```

***

### 1.3 Crear las tablas

En phpMyAdmin → pestaña **SQL**, ejecuta:

```sql
CREATE TABLE puestos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  parent_id INT DEFAULT NULL,
  FOREIGN KEY (parent_id) REFERENCES puestos(id)
);

CREATE TABLE eventos_calendario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100),
  fecha_inicio DATETIME,
  duracion_minutos INT,
  estado ENUM('programado','completado','cancelado'),
  puesto_id INT,
  FOREIGN KEY (puesto_id) REFERENCES puestos(id)
);
```

***

### 1.4 Insertar datos iniciales

Inserta los puestos y eventos de ejemplo (como ya lo hiciste) para que el organigrama se muestre desde el inicio.

***

## ⚙️ PASO 2: Ejecutar el BACKEND

### 2.1 Entrar a la carpeta backend

En **CMD**:

```bash
cd ruta\a\Examen-IParcial\backend
```

***

### 2.2 Instalar dependencias

```bash
npm install
```

***

### 2.3 Ejecutar el servidor

```bash
node server.js
```

Si todo va bien, verás:

```text
✅ Conectado a MySQL correctamente
✅ Backend ejecutándose en http://localhost:3000
```

 **NO cierres esta terminal**

***

### 2.4 Probar el backend

En el navegador entra a:

    http://localhost:3000/api/organigrama/resumen

Debe mostrar un **JSON** con la estructura del organigrama ✅

***

## 🎨 PASO 3: Ejecutar el FRONTEND

### 3.1 Entrar a la carpeta frontend

En otra terminal distinta:

```bash
cd ruta\a\Examen-IParcial\frontend-react
```

***

### 3.2 Instalar dependencias

```bash
npm install
```

***

### 3.3 Ejecutar la aplicación

```bash
npm start
```

El navegador se abrirá automáticamente en:

    http://localhost:3001

✅ La aplicación ya está funcionando

***

## 3️⃣ Cómo usar el sistema (Guía de usuario)

***

## 🧭 Vista principal: Organigrama

Al abrir la aplicación, el usuario ve:

*   El **organigrama jerárquico**
*   Cada tarjeta representa un **puesto**
*   Se muestra:
    *   Carga de trabajo (horas)
    *   Porcentaje de avance
    *   Barra de progreso

***

## ⏱ Selector de tiempo

En la parte superior se puede elegir el período:

*   **Semanal**
*   **Quincenal**
*   **Mensual**
*   **Anual**

 Al cambiar el período:

*   Se recalculan las métricas
*   Los avances cambian según las fechas reales de las actividades

***

## 🖱️ Ver actividades por puesto

### Cómo hacerlo:

1.  Haz clic en cualquier puesto del organigrama
2.  Se abre un **panel lateral de actividades**

En este panel se muestran:

*   ✅ Todas las actividades del puesto
*   📅 Filtradas por el período seleccionado
*   📌 Diferenciadas por estado:
    *   🟢 Completado
    *   🟡 Programado
    *   🔴 Cancelado

***

## ➕ Agregar una nueva tarea

### Pasos:

1.  Haz clic en **“+ Agregar tarea”**
2.  Se abre un formulario
3.  Completa:
    *   Título
    *   Puesto
    *   Fecha
    *   Duración
    *   Estado
4.  Presiona **Guardar**

✅ La tarea se guarda **en la base de datos**
✅ Se mantiene aunque cierres el programa

***

##  Persistencia de datos

*   Las tareas se almacenan en **MySQL**
*   Al cerrar y volver a abrir el sistema:
    *   ✅ Los datos siguen disponibles
    *   ✅ El organigrama se recalcula automáticamente

***

##  Resumen final

Este sistema permite:

✔️ Gestionar un organigrama dinámico  
✔️ Visualizar carga y avance por puesto  
✔️ Registrar tareas de calendario persistentes  
✔️ Filtrar por período de tiempo  
✔️ Consultar actividades por rol

 **Es un sistema funcional, escalable y profesional**

***

##  Nota para evaluación

> *“El sistema integra una base de datos relacional, un backend en Node.js y una interfaz en React para gestionar un organigrama dinámico y un calendario de tareas, permitiendo análisis de carga y avance en distintos períodos de tiempo.”*

***