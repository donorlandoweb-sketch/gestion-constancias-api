const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db_name = path.join(__dirname, 'constancias.db');
const db = new sqlite3.Database(db_name, (err) => {
  if (err) console.log('Error al conectar a la base de datos:', err);
  else console.log('Conectado a la base de datos SQLite');
});

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

  db.run(`INSERT OR IGNORE INTO especialidad (id, nombre) VALUES (1, 'Informática')`);
  db.run(`INSERT OR IGNORE INTO tipo_documento (id, nombre) VALUES (1, 'Constancia de estudio')`);
  db.run(`INSERT OR IGNORE INTO estatus (id, nombre) VALUES (1, 'Pendiente')`);
});

module.exports = db;