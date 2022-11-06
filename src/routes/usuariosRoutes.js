const express = require("express");

const {
  cadastrarUsuarios,
  login,
  atualizarUsuario,
  listarUsuarios,
  detalharUsuario,
  deletarConta,
  tornarAdministrador,
} = require("../controllers/usersController");
const auth = require("../middleware/Auth");
const router = express.Router();

router
  .post("/cadastro", cadastrarUsuarios)
  .post("/login", login)
  .put("/usuario", auth, atualizarUsuario)
  .get("/usuario/:trilha", auth, listarUsuarios)
  .get("/usuario", auth, listarUsuarios)
  .get("/usuario/perfil/:id", auth, detalharUsuario)
  .put("/usuario/perfil/:id", auth, tornarAdministrador)
  .delete("/usuario/perfil/:id", auth, deletarConta);

module.exports = router;
