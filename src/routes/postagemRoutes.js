const express = require("express");
const {
  registrarPostagens,
  listarPostagens,
  detalharPostagem,
  deletarPostagem,
  atualizarPostagem,
} = require("../controllers/postagemController");
const router = express.Router();
const auth = require("../middleware/Auth");

/* POSTAGEM */
router
  .post("/postagem/post", auth, registrarPostagens)
  .get("/postagem/post", listarPostagens)
  .get("/postagem/post/:id", detalharPostagem)
  .delete("/postagem/post/:id", auth, deletarPostagem)
  .put("/postagem/post/:id", auth, atualizarPostagem);

/*  COMENTÁRIOS */

router 
.post("/postagem/comentar/:id", auth)

module.exports = router;
