const express = require("express");
const {
  registrarConteudos,
  registrarPerguntas,
  registrarRespostas,
  pegarConteudos,
  procurarPerguntas,
  pegarRespostas,
} = require("../controllers/conteudosController");
const router = express.Router();
const auth = require("../middleware/Auth");

router
  .post("/conteudos", auth, registrarConteudos)
  .post("/respostas", auth, registrarRespostas)
  .post("/perguntas", auth, registrarPerguntas)
  .get("/conteudos/:trilha", pegarConteudos)
  .get("/perguntas", procurarPerguntas)
  .get("respostas/:idPergunta", pegarRespostas);

module.exports = router;
