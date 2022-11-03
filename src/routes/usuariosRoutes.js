const express = require("express");
const upExperiencia = require("../controllers/funcoesControllers");

const {
  cadastrarUsuarios,
  login,
  atualizarUsuario,
} = require("../controllers/usersController");
const auth = require("../middleware/Auth");
const router = express.Router();

router
  .post("/usuarios", cadastrarUsuarios)
  .post("/login", login)
  .put("/usuarios", auth, atualizarUsuario)
  .post("/usuarios/:xp", auth, upExperiencia);

module.exports = router;
