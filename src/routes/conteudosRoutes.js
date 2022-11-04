const express = require("express");
const {
  registrarConteudos,
  registrarPostagens,
  registrarComentario,

  pegarConteudoUsuario,
} = require("../controllers/conteudosController");
const router = express.Router();
const auth = require("../middleware/Auth");

router
  .post("/conteudos", auth, registrarConteudos)
  .get("/conteudos/:trilha")
  .get("/conteudos", pegarConteudoUsuario)
  .post("/comentarios", auth, registrarComentario)
  .post("/posts", auth, registrarPostagens)
  .get("/posts");

module.exports = router;
