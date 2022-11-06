const express = require("express");

const {
  cadastrarUsuarios,
  login,
  atualizarUsuario,
  listarUsuarios,
  detalharUsuario,
} = require("../controllers/usersController");
const auth = require("../middleware/Auth");
const router = express.Router();

router
  .post("/cadastro", cadastrarUsuarios)
  .post("/login", login)
  .put("/usuario", auth, atualizarUsuario)
  .get("/usuario/:trilha", auth, listarUsuarios)
  .get("/usuario", auth, listarUsuarios)
  .get("/usuario/perfil/:id", auth, detalharUsuario);

module.exports = router;
