const express = require("express");

const {
  cadastrarUsuarios,
  login,
  atualizarUsuario,
} = require("../controllers/usersController");
const auth = require("../middleware/Auth");
const router = express.Router();

router
  .post("/cadastro", cadastrarUsuarios)
  .post("/login", login)
  .put("/usuario", auth, atualizarUsuario)
  .post("/usuario/:xp");

module.exports = router;
