const express = require("express");
const {
  criarPlano,
  detalharPlano,
  adicionarItem,
  listarPlanos,
  atualizarPlano,
  atualizarItem,
  removerItem,
  apagarPlano,
} = require("../controllers/planosController");
const Auth = require("../middleware/Auth");
const router = express.Router();

router.use(Auth);
router
  .get("/plano/:idPlano", detalharPlano)
  .get("/plano", listarPlanos)
  .post("/plano", criarPlano)
  .post("/plano/item/:idConteudo", adicionarItem)
  .put("/plano/item/:idConteudo", atualizarItem)
  .put("/plano/:idPlano", atualizarPlano)
  .delete("/plano/item/:idConteudo", removerItem)
  .delete("/plano/:idPlano", apagarPlano);

module.exports = router;
