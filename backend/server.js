const express = require("express");
const cors = require("cors");
const initDB = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// rotas
app.use("/cadastro", require("./routes/cadastro"));
app.use("/admin", require("./routes/admin"));
app.use("/admin", require("./routes/adminAuth"))

async function start() {
  await initDB();

  app.listen(3000, () => {
    console.log("🚀 Servidor rodando em http://localhost:3000");
  });
}

start();
``