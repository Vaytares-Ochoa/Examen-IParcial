const mysql = require("mysql2");

// Crear conexión a MySQL (XAMPP)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",          // en XAMPP normalmente está vacío
  database: "organigrama_db"
});

// Probar conexión
db.connect((err) => {
  if (err) {
    console.error("❌ Error conectando a MySQL:", err);
  } else {
    console.log("✅ Conectado a MySQL correctamente");
  }
});

module.exports = db;