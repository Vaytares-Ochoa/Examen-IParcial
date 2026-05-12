
# 🧠 🔷 1. FLUJO GENERAL DEL SISTEMA

Primero entiende esto:

👉 Tu sistema tiene **3 entradas principales**:

1.  Crear puesto
2.  Crear evento/tarea
3.  Consultar datos

***

# 🔄 2. DIAGRAMA DE ACTIVIDAD — INGRESO DE DATOS

👉 Aquí se muestra **cómo el usuario ingresa información**

## ✅ Crear puesto (jerarquía)
```mermaid
flowchart TD
Inicio --> Usuario_UI
Usuario_UI --> FormularioPuesto
FormularioPuesto --> ValidarDatos

ValidarDatos -->|Correcto| EnviarAPI
ValidarDatos -->|Error| MostrarError

EnviarAPI --> Backend
Backend --> GuardarDB
GuardarDB --> Confirmacion

Confirmacion --> MostrarUI
MostrarUI --> Fin
MostrarError --> Fin
```


📌 EXPLICACIÓN:

*   El usuario escribe:
    *   nombre del puesto
    *   puesto padre (jerarquía)
*   El sistema:
    *   valida datos
    *   guarda relación (parent\_id)

👉 Esto crea la estructura tipo árbol

***

## ✅ Crear evento/tarea
```mermaid
flowchart TD
Inicio --> UI_Evento
UI_Evento --> FormularioEvento
FormularioEvento --> ValidarEvento

ValidarEvento -->|Correcto| API_Evento
ValidarEvento -->|Error| ErrorUI

API_Evento --> Backend_Evento
Backend_Evento --> RelacionarPuesto

RelacionarPuesto --> GuardarEvento
GuardarEvento --> ConfirmacionEvento
ConfirmacionEvento --> MostrarUI
ErrorUI --> Fin
MostrarUI --> Fin
```


📌 EXPLICACIÓN:

*   El evento SIEMPRE se relaciona con un puesto
*   Se guarda con:
    *   puesto\_id
    *   fecha
    *   duración
    *   estado

***

# 🔗 3. DIAGRAMA DE SECUENCIA — FLUJO DETALLADO

## ✅ Crear puesto
```mermaid
sequenceDiagram
actor Usuario
Usuario ->> Frontend: Llena formulario puesto
Frontend ->> Backend: POST /puestos
Backend ->> DB: INSERT puesto (parent_id)
DB -->> Backend: OK
Backend -->> Frontend: Respuesta OK
Frontend -->> Usuario: Confirmación

```


***

## ✅ Crear evento (tarea)
```
sequenceDiagram
actor Usuario
Usuario ->> Frontend: Crea tarea/evento
Frontend ->> Backend: POST /evento
Backend ->> DB: Validar puesto_id
DB -->> Backend: OK
Backend ->> DB: INSERT evento
DB -->> Backend: OK
Backend -->> Frontend: Evento creado
Frontend -->> Usuario: Confirmación
```


***

# 🧩 4. DIAGRAMA DE CLASES (CÓMO SE ORGANIZA EL SISTEMA)

👉 Este explica **cómo se distribuyen los datos**

```
classDiagram
class Puesto {
  id: number
  nombre: string
  parent_id: number
}

class Evento {
  id: number
  titulo: string
  fecha_inicio: Date
  estado: string
  puesto_id: number
}

class DB {
  guardarPuesto()
  guardarEvento()
}

Puesto "1" --> "0..*" Puesto : jerarquía
Puesto "1" --> "0..*" Evento : asigna
```

📌 EXPLICACIÓN IMPORTANTE:

*   `parent_id` crea la jerarquía
*   `puesto_id` conecta evento con puesto

👉 Esta es la base lógica del sistema

***

# 🌳 5. DIAGRAMA DE ESTRUCTURA (JERARQUÍA REAL)

👉 Cómo se distribuyen los puestos

```
flowchart TD
Director --> GerenteTI
Director --> GerenteAdmin

GerenteTI --> BackendLead
GerenteTI --> FrontendLead

BackendLead --> Evento1
FrontendLead --> Evento2
```

📌 Interpretación:

*   Cada nivel depende del anterior
*   Los eventos cuelgan del puesto

***

# 🔁 6. DIAGRAMA DE COMUNICACIÓN

👉 Cómo interactúan los componentes

```
flowchart LR
Usuario --> Frontend
Frontend --> API
API --> BD
BD --> API
API --> Frontend
Frontend --> Usuario
```

***

# 🔄 7. DIAGRAMA DE ESTADOS (EVENTO)

👉 Cómo cambia una tarea

```
stateDiagram-v2
[*] --> Programado

Programado --> EnCurso : inicia
EnCurso --> Completado : termina
EnCurso --> Cancelado : cancelación

Cancelado --> [*]
Completado --> [*]
```

📌 Esto es clave para lógica de negocio

***

# 🔍 8. DIAGRAMA DE ACTIVIDAD — CONSULTA DE DATOS

👉 Cómo se distribuyen los datos al usuario

```
flowchart TD
Inicio --> SolicitarDatos
SolicitarDatos --> API
API --> ConsultarDB
ConsultarDB --> ConstruirArbol
ConstruirArbol --> RespuestaJSON
RespuestaJSON --> MostrarUI
MostrarUI --> Fin
```

📌 CLAVE:
👉 Aquí pasa lo más importante:

*   El backend convierte los datos en **estructura jerárquica**

***

# 🧠 9. EXPLICACIÓN GLOBAL DEL FUNCIONAMIENTO

👉 En palabras simples:

## 🔹 1. Ingreso de datos

*   Usuario crea puesto → se guarda con `parent_id`
*   Usuario crea evento → se guarda con `puesto_id`

***

## 🔹 2. Almacenamiento

Base de datos:

    PUESTOS
    - id
    - parent_id

    EVENTOS
    - puesto_id

***

## 🔹 3. Distribución

Cuando consultas:

👉 El sistema:

1.  Lee todos los puestos
2.  Reconstruye árbol
3.  Agrega eventos a cada nodo

***

## 🔹 4. Visualización

Frontend muestra:

*   Organigrama (estructura)
*   Calendario (eventos)

***
