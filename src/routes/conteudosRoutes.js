const express = require("express");
const {
  registrarConteudos,
  listarConteudos,
  listarConteudoTrilha,
  detalharConteudo,
  deletarConteudo,
  atualizarConteudo,
} = require("../controllers/conteudosController");
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

module.exports = router;
