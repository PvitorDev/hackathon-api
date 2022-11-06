const express = require("express");
const {
  registrarConteudos,
  registrarPostagens,
  listarConteudos,
  listarConteudoTrilha,
  detalharConteudo,
  deletarConteudo,
  listarPostagens,
  detalharPostagem,
  deletarPostagem,
  atualizarPostagem,
  atualizarConteudo,
} = require("../controllers/postagemController");
const router = express.Router();
const auth = require("../middleware/Auth");

/* CONTEUDOS */
router
  .post("/postagem/conteudo", auth, registrarConteudos)
  .get("/postagem/conteudos", listarConteudos)
  .get("/postagem/conteudos/trilha/:trilha", listarConteudoTrilha)
  .get("/postagem", detalharConteudo)
  .delete("/postagem", auth, deletarConteudo)
  .put("/postagem", auth, atualizarConteudo);

/* POSTAGEM */
router
  .post("/postagem/post", auth, registrarPostagens)
  .get("/postagem/post", listarPostagens)
  .get("/postagem/post/:id", detalharPostagem)
  .delete("/postagem/post/:id", auth, deletarPostagem)
  .put("/postagem/post/:id", auth, atualizarPostagem);



module.exports = router;
