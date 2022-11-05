const express = require("express");

const {
  cadastrarUsuarios,
  login,
  atualizarUsuario,
  listarUsuarios,
  detalharUsuario,
  deletarUsuario,
} = require("../controllers/usersController");
const auth = require("../middleware/Auth");
const logout = require("../middleware/logout");
const router = express.Router();

router
  .post("/cadastro", cadastrarUsuarios)
  .post("/login", login)
  .put("/usuario", auth, atualizarUsuario)
  .get("/usuario/:trilha", auth, listarUsuarios)
  .get("/usuario", auth, listarUsuarios)
  .get("/usuario/perfil/:id", auth, detalharUsuario)
  .delete("/usuario/del/:id", auth, deletarUsuario, logout);

module.exports = router;
