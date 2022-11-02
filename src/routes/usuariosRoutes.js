const express = require("express");

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
  .put("/usuarios", auth, atualizarUsuario);

module.exports = router;
