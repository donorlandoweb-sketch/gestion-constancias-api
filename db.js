const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 📂 Ruta absoluta a la base de datos
const db_path = path.join(__dirname, 'constancias.db');
console.log('📂 DB path:', db_path);

const db = new sqlite3.Database(db_path, (err) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos SQLite');
  }
});

// Crear tablas si no existen
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS constancias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cedula TEXT,
    apellidos TEXT,
    nombres TEXT,
    especialidad TEXT,
    tipoDocumento TEXT,
    estatus TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS especialidad (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS tipo_documento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS estatus (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT
  )`);

  // Datos iniciales
  db.run(`INSERT OR IGNORE INTO especialidad (id, nombre) VALUES (1, 'Informática')`);
  db.run(`INSERT OR IGNORE INTO tipo_documento (id, nombre) VALUES (1, 'Constancia de estudio')`);
  db.run(`INSERT OR IGNORE INTO estatus (id, nombre) VALUES (1, 'Pendiente')`);
});

module.exports = db;

