const express = require("express");
const cors = require("cors");
const initDB = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/admin", require("./routes/admin"));
app.use("/cadastro", require("./routes/cadastro"));

async function start() {
  await initDB(); 

  app.get("/", (req, res) => {
    res.json({ status: "API da igreja rodando ✅" });
  });

  app.listen(3000, () => {
    console.log("🚀 Servidor rodando em http://localhost:3000");
  });
}

start();
