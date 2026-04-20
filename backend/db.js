const fs = require("fs");
const initSqlJs = require("sql.js");

let db; 

async function initDB() {
  if (db) return db; 

  const SQL = await initSqlJs();

  const filebuffer = fs.readFileSync("./IGREJA.db");
  db = new SQL.Database(filebuffer);

  console.log("✅ Banco SQLite carregado com sql.js");
  return db;
}

module.exports = initDB;
