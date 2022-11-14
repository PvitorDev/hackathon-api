const knex = require("../config/database");
module.exports = {
  async criarPlano(req, res) {
    const idUsuario = req.user;
    const { nome } = req.body;
    try {
      await knex("plano_estudos")
        .insert({
          id_usuario: idUsuario,
          nome: nome,
        })
        .returning("*");
      return res.status(201).json({ mensagem: "Plano criado" });
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },
  async detalharPlano(req, res) {
    const idUsuario = req.user;
    const { idPlano } = req.params;
    try {
      const plano = await knex("plano_estudos")
        .where("id", idPlano)
        .andWhere("plano_estudos.id_usuario", idUsuario);

      const itens = await knex("itens_estudos")
        .where("itens_estudos.id_usuario", idUsuario)
        .join(
          "postagem_conteudos",
          "postagem_conteudos.id",
          "=",
          "itens_estudos.id_conteudo",
        )
        .andWhere("id_plano", idPlano)
        .select("*");
      return res.status(200).json({ plano, itens });
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },
  async listarPlanos(req, res) {
    const idUsuario = req.user;
    try {
      const planos = await knex("plano_estudos")
        .where("id_usuario", idUsuario)
        .orderBy("id", "desc")
        .returning("*");
      return res.status(201).json(planos);
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },
  async adicionarItem(req, res) {
    const idUsuario = req.user;
    const { idPlano } = req.query;
    const { idConteudo } = req.params;
    try {
      const plano = await knex("plano_estudos").where("id", idPlano).first();
      if (!plano) {
        return res.status(404).json({ mensagem: "Você não tem um plano" });
      }
      await knex("itens_estudos")
        .insert({
          id_usuario: idUsuario,
          id_conteudo: idConteudo,
          id_plano: idPlano,
        })
        .returning("*");
      return res.status(201).json({ mensagem: "Plano atualizado" });
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },
  async atualizarPlano(req, res) {
    const { nome } = req.body;
    const { idPlano } = req.params;
    try {
      if (!nome) {
        await knex("plano_estudos")
          .where("id", idPlano)
          .update({
            concluido: true,
          })
          .returning("*");
      } else {
        await knex("plano_estudos")
          .where("id", idPlano)
          .update({
            nome: nome,
          })
          .returning("*");
      }
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },
  async atualizarItem(req, res) {
    const { idPlano } = req.query;
    const { idConteudo } = req.params;
    const idUsuario = req.user;

    try {
      await knex("itens_estudos")
        .where("id_conteudo", idConteudo)
        .andWhere("id_plano", idPlano)
        .andWhere("id_usuario", idUsuario)
        .update({
          concluido: true,
        });

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },
  async removerItem(req, res) {
    const { idPlano } = req.query;
    const { idConteudo } = req.params;
    const idUsuario = req.user;
    try {
      await knex("itens_estudos")
        .where("id_conteudo", idConteudo)
        .andWhere("id_plano", idPlano)
        .andWhere("id_usuario", idUsuario)
        .del();
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },
  async apagarPlano(req, res) {
    const { idPlano } = req.params;
    const idUsuario = req.user;
    try {
      await knex("plano_estudos")
        .where("id_usuario", idUsuario)
        .andWhere("id", idPlano)
        .del();
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },
};
