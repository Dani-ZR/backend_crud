const pool = require("./db");

async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("✔ Conexión exitosa:", rows);
  } catch (err) {
    console.error("❌ Error al conectar:", err);
  }
}

testConnection();

