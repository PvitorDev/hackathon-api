const express = require("express");
const {
  registarComentarios,
  favoritarItem,
  meusFavoritos,
} = require("../controllers/geralController");
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

router.post("/postagem/comentar/:id_postagem", auth, registarComentarios);

router
  .post("/postagem/favoritar/:id_conteudos", auth, favoritarItem)
  .get("/postagem/favoritos", auth, meusFavoritos);

module.exports = router;
