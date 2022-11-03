const express = require("express");
const {
  registrarConteudos,
  registrarPostagens,
  registrarComentario,
  pegarConteudos,
  procurarPostagens,
  pegarComentario,
} = require("../controllers/conteudosController");
const router = express.Router();
const auth = require("../middleware/Auth");

router
  .post("/conteudos", auth, registrarConteudos)
  .post("/comentarios", auth, registrarComentario)
  .post("/posts", auth, registrarPostagens)
  .get("/conteudos/:trilha", pegarConteudos)
  .get("/posts", procurarPostagens)
  .get("/comentarios/:idPosts", pegarComentario);

module.exports = router;
