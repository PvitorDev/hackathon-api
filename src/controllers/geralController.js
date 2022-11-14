const knex = require("../config/database");
module.exports = {
  async registarComentarios(req, res) {
    const id_usuario = req.user;
    const { id_postagem } = req.params;
    const { comentario } = req.body;

    try {
      const postagem = await knex("postagens").where({
        id: id_postagem,
      });

      if (!postagem.length) {
        return res.status(404).json({ mensagem: "Postagem não foi encontrada" });
      }

      const registarComentarios = await knex("postagem_comentarios")
        .insert({
          id_usuario,
          id_postagem,
          comentario,
        })
        .returning("*");

      if (!registarComentarios) {
        return res
          .status(404)
          .json({ mensagem: "Não foi possível concluir o comentário" });
      }
      return res
        .status(201)
        .json({ mensagem: "Comentario realizada com sucesso" });
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },

  async favoritarItem(req, res) {
    const { idConteudos } = req.params;
    const idUsuario = req.user;
    try {
      const favoritado = await knex("postagem_favoritos")
        .where({
          id_usuario: idUsuario,
          id_conteudos: idConteudos,
        })
        .first();
      if (favoritado) {
        await knex("postagem_favoritos")
          .where({
            id_usuario: idUsuario,
            id_conteudos: idConteudos,
          })
          .del();
        return res.status(200).json({ mensagem: "Removido dos favoritos" });
      }
      await knex("postagem_favoritos")
        .insert({
          id_usuario: idUsuario,
          id_conteudos: idConteudos,
        })
        .returning("*");
      return res.status(201).json({ mensagem: "Favoritado" });
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },

  async meusFavoritos(req, res) {
    const { page = 1 } = req.query;
    const id = req.user;
    try {
      const countObj = knex("postagem_favoritos").count();
      const favoritos = await knex("postagem_favoritos")
        .where("postagem_favoritos.id_usuario", id)
        .join(
          "postagem_conteudos",
          "postagem_conteudos.id",
          "=",
          "postagem_favoritos.id_conteudos",
        )
        .limit(10)
        .offset((page - 1) * 10)
        .returning("*");
      if (id) {
        countObj.where("postagem_favoritos.id_usuario", id);
      }
      const [count] = await countObj;
      res.header({
        "X-Total-Count": count["count"],
        "Access-Control-Expose-Headers": "X-Total-Count",
      });
      return res.status(200).json({ favoritos });
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },
};
