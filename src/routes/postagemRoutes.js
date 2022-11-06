const express = require("express");
const {
  registrarConteudos,
  registrarPostagens,
  listarConteudos,
  listarConteudoTrilha,
  detalharConteudo,
  deletarConteudo,
} = require("../controllers/postagemController");
const router = express.Router();
const auth = require("../middleware/Auth");

router
  .post("/postagem/conteudo", auth, registrarConteudos)
  .post("/postagem", auth, registrarPostagens)
  .get("/postagem/conteudos", listarConteudos)
  .get("/postagem/conteudos/trilha/:trilha", listarConteudoTrilha)
  .get("/postagem", detalharConteudo)
  .delete("/postagem", auth, deletarConteudo);
   
module.exports = router;
