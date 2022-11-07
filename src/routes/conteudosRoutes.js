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
const { validarCampo } = require("../middleware/campoVazio");
const schemaConteudo = require("../utils/conteudosValidate");

/* CONTEUDOS */
router
  .post(
    "/postagem/conteudo",
    auth,
    validarCampo(schemaConteudo),
    registrarConteudos,
  )
  .get("/postagem/conteudos", listarConteudos)
  .get("/postagem/conteudos/trilha/:trilha", listarConteudoTrilha)
  .get("/postagem", detalharConteudo)
  .delete("/postagem", auth, deletarConteudo)
  .put("/postagem", auth, validarCampo(schemaConteudo), atualizarConteudo);

module.exports = router;
