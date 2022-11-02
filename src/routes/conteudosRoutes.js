const express = require("express");
const {
  registrarConteudos,
  registrarPerguntas,
  registrarRespostas,
} = require("../controllers/conteudosController");
const router = express.Router();
const auth = require("../middleware/Auth");

router.use(auth);
router
  .post("/conteudos", registrarConteudos)
  .post("/respostas", registrarRespostas)
  .post("/perguntas", registrarPerguntas);

module.exports = router;
