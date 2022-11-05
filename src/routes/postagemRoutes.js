const express = require("express");
const {
  registrarConteudos,
  registrarPostagens,
  registrarComentario,
  listarConteudos,
  listarPostagens,
  listarComentario,
} = require("../controllers/postagemController");
const router = express.Router();
const auth = require("../middleware/Auth");

router
  .post("/postagem/conteudo", auth, registrarConteudos)
  .post("/postagem/comentar", auth, registrarComentario)
  .post("/postagem", auth, registrarPostagens)
  .get("/postagem/conteudos", listarConteudos)
  .get("/postagem", listarPostagens)
  .get("/postagem/conteudos/:trilha")
  .get("/postagem/comentarios/:idPosts", listarComentario);

module.exports = router;
