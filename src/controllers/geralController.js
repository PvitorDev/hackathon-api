const knex = require("../config/database");
module.exports = {
  async registarComentarios(req, res) {
    const id_usuario = req.user;
    const { id_conteudos } = req.params;
    const { comentario } = req.body;
    if (!comentario) {
      return res.status(404).json({ message: "O comentário é obrigatório" });
    }
    try {
      const postagem = await knex("postagens").where({
        id: id_conteudos,
      });

      if (!postagem.length) {
        return res.status(404).json({ message: "Postagem não foi encontrada" });
      }

      const registarComentarios = await knex("postagem_comentarios")
        .insert({
          id_usuario,
          id_conteudos,
          comentario,
        })
        .returning("*");

      if (!registarComentarios) {
        return res
          .status(404)
          .json({ message: "Não foi possível concluir o comentário" });
      }
      return res
        .status(201)
        .json({ mensagem: "Comentario realizada com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async favoritarItem(req, res) {
    const { id_conteudos } = req.params;
    const id_usuario = req.user;
    try {
      const favoritado = await knex("postagem_curtidas")
        .where({
          id_usuario: id_usuario,
          id_conteudos: id_conteudos,
        })
        .first();
      if (favoritado) {
        await knex("postagem_curtidas")
          .where({
            id_usuario: id_usuario,
            id_conteudos: id_conteudos,
          })
          .del();
        return res.status(200).json({ mensagem: "Removido dos favoritos" });
      }
      await knex("postagem_curtidas")
        .insert({
          id_usuario: id_usuario,
          id_conteudos: id_conteudos,
        })
        .returning("*");
      return res.status(201).json({ mensagem: "Favoritado" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async meusFavoritos(req, res) {
    const id = req.user;
    try {
      const favoritos = await knex("postagem_curtidas")
        .where("postagem_curtidas.id_usuario", id)
        .join(
          "postagem_conteudos",
          "postagem_conteudos.id",
          "=",
          "postagem_curtidas.id_conteudos",
        )
        .returning("*");

      return res.status(200).json({ favoritos });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
