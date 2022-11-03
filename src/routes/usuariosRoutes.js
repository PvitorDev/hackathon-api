const express = require("express");

const {
  cadastrarUsuarios,
  login,
  atualizarUsuario,
  upExperiencia,
} = require("../controllers/usersController");
const auth = require("../middleware/Auth");
const router = express.Router();

router
  .post("/singin", cadastrarUsuarios)
  .post("/login", login)
  .put("/usuario", auth, atualizarUsuario)
  .post("/usuario/:xp", auth, upExperiencia);

module.exports = router;
