const mysql = require("mysql");

const db = mysql.createConnection({
    host: "192.168.1.73",   // IP de la DB
    user: "admin",
    password: "Collins10$",
    database: "backend_db"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Error conectando a MySQL:", err);
        return;
    }
    console.log("🟢 Conectado a la base de datos MySQL");
});

module.exports = db;

