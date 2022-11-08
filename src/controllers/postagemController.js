const knex = require("../config/database");
module.exports = {
  async registrarPostagens(req, res) {
    const { titulo, descricao, tipo } = req.body;
    const nome = req.nome;
    const id = req.user;
    try {
      await knex("postagens")
        .insert({
          id_usuario: id,
          titulo,
          descricao,
          tipo,
          criador_nome: nome,
        })
        .returning("*");
      return res.status(201).json();
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },
  async listarPostagens(req, res) {
    const { id_usuario, page = 1 } = req.query;
    try {
      const query = knex("postagens")
        .limit(10)
        .offset((page - 1) * 10);

      const countObj = knex("postagens").count();
      if (id_usuario) {
        query
          .where({ id_usuario })
          .join("usuarios", "usuarios.id", "=", "postagens.id_usuario")
          .select("postagens.*");

        countObj.where({ id_usuario });
      }
      const [count] = await countObj;
      res.header("X-Total-Count", count["count"]);

      const results = await query;
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },
  async detalharPostagem(req, res) {
    const { id } = req.params;
    try {
      const postagem = await knex("postagens").where({ id });

      const comentarios = await knex("postagem_comentarios")
        .join("usuarios", "usuarios.id", "=", "postagem_comentarios.id_usuario")
        .where("id_postagem", id)
        .select(
          "usuarios.id",
          "usuarios.nome",
          "postagem_comentarios.comentario",
        );
      return res.status(200).json({ postagem, comentarios });
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },
  async deletarPostagem(req, res) {
    const { id } = req.params;
    const admin = req.admin;
    const id_usuario = req.user;
    try {
      if (!admin) {
        const results = await knex("postagens")
          .where({ id })
          .andWhere({ id_usuario })
          .del();
        if (!results) {
          return res
            .status(404)
            .json({ mensagem: "Você não é um administrador" });
        }
        return res.status(204).json();
      }
      await knex("postagens").where({ id }).del();

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },
  async atualizarPostagem(req, res) {
    const { id } = req.params;
    const { titulo, descricao, tipo } = req.body;
    const id_usuario = req.user;
    try {
      const results = await knex("postagens")
        .where({ id })
        .andWhere({ id_usuario })
        .update({
          titulo,
          descricao,
          tipo,
          atualizado_em: new Date(),
        })
        .returning("*");
      if (!results) {
        return res.status(404).json({ mensagem: "Você não é um administrador" });
      }
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },
};
