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
const { validarCampo } = require("../middleware/campoVazio");
const schemaCad = require("../utils/cadastroValidate");
const schemaUser = require("../utils/loginValidate");
const router = express.Router();

router
  .post("/cadastro", validarCampo(schemaCad), cadastrarUsuarios)
  .post("/login", validarCampo(schemaUser), login);

router
  .get("/usuario/:trilha", auth, listarUsuarios)
  .get("/usuario", auth, listarUsuarios)
  .get("/usuario/perfil/:id", detalharUsuario)
  .put("/usuario/perfil/:id", auth, tornarAdministrador)
  .put("/usuario", auth, validarCampo(schemaCad), atualizarUsuario)
  .delete("/usuario/perfil/:id", auth, deletarConta);

module.exports = router;
