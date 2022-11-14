const knex = require("../config/database");
module.exports = {
  async registrarConteudos(req, res) {
    const { titulo, tipo, trilha, duracao, link } = req.body;
    const nome = req.nome;
    const id = req.user;
    const admin = req.admin;
    try {
      if (!admin) {
        return res
          .status(404)
          .json({ mensagem: "Você não é um administrador" });
      }
      await knex("postagem_conteudos")
        .insert({
          id_usuario: id,
          titulo,
          tipo,
          trilha,
          criador_nome: nome,
          duracao,
          link,
        })
        .returning("*");
      return res
        .status(201)
        .json({ mensagem: "Conteúdo registrado com sucesso!" });
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },

  async listarConteudos(req, res) {
    const { id_usuario, page = 1 } = req.query;
    try {
      const query = knex("postagem_conteudos")
        .limit(10)
        .offset((page - 1) * 10);

      const countObj = knex("postagem_conteudos").count();
      if (id_usuario) {
        query
          .where({ id_usuario })
          .join("usuarios", "usuarios.id", "=", "postagem_conteudos.id_usuario")
          .select("postagem_conteudos.*");

        countObj.where({ id_usuario });
      } else {
        query.select("postagem_conteudos.*");
      }

      const [count] = await countObj;

      res.header({
        "X-Total-Count": count["count"],
        "Access-Control-Expose-Headers": "X-Total-Count",
      });
      const results = await query;
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },

  async listarConteudoTrilha(req, res) {
    const { trilha } = req.params;
    const { id_usuario, filter, page = 1 } = req.query;
    try {
      const query = knex("postagem_conteudos")
        .limit(10)
        .offset((page - 1) * 10);

      const countObj = knex("postagem_conteudos").count();

      if (!filter) {
        if (trilha && !id_usuario) {
          query
            .where({ trilha })
            .select("postagem_conteudos.*")
            .orderBy("id", "asc");

          countObj.where({ trilha });
        } else {
          query
            .where({ trilha })
            .andWhere({ id_usuario })
            .orderBy("id", "asc")
            .select("postagem_conteudos.*");
        }
      } else if (filter === "id") {
        query
          .where({ trilha })
          .select("postagem_conteudos.*")
          .orderBy("id", "desc");

        countObj.where({ trilha });
      } else {
        query
          .where({ trilha })
          .select("postagem_conteudos.*")
          .orderBy("titulo", "asc");

        countObj.where({ trilha });
      }
      const [count] = await countObj;

      res.header({
        "X-Total-Count": count["count"],
        "Access-Control-Expose-Headers": "X-Total-Count",
      });
      const results = await query;
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },
  async listarConteudoTipo(req, res) {
    const { tipo } = req.params;
    const { trilha, filter, page = 1 } = req.query;
    try {
      const query = knex("postagem_conteudos")
        .limit(10)
        .offset((page - 1) * 10);

      const countObj = knex("postagem_conteudos").count();

      if (!filter) {
        if (trilha && !trilha) {
          query
            .where({ tipo })
            .select("postagem_conteudos.*")
            .orderBy("id", "asc");

          countObj.where({ tipo });
        }
      } else if (filter === "id") {
        query
          .where({ tipo })
          .select("postagem_conteudos.*")
          .orderBy("id", "desc");

        countObj.where({ tipo });
      } else {
        query
          .where({ tipo })
          .select("postagem_conteudos.*")
          .orderBy("titulo", "asc");

        countObj.where({ tipo });
      }
      const [count] = await countObj;

      res.header({
        "X-Total-Count": count["count"],
        "Access-Control-Expose-Headers": "X-Total-Count",
      });
      const results = await query;
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },

  async detalharConteudo(req, res) {
    const { id_conteudo } = req.query;
    try {
      const results = await knex("postagem_conteudos")
        .where("id", id_conteudo)
        .first();
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },

  async deletarConteudo(req, res) {
    const { id_conteudo } = req.query;
    const admin = req.admin;
    try {
      if (!admin) {
        return res
          .status(404)
          .json({ mensagem: "Você não é um administrador!" });
      }
      await knex("postagem_conteudos").where("id", id_conteudo).del();
      return res
        .status(204)
        .json({ mensagem: "Conteudo deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },

  async atualizarConteudo(req, res) {
    const { id_conteudo } = req.query;
    const { titulo, tipo, trilha, duracao, link } = req.body;
    const admin = req.admin;
    try {
      if (!admin) {
        return res
          .status(404)
          .json({ mensagem: "Você não é um administrador!" });
      }
      await knex("postagem_conteudos")
        .where("id", id_conteudo)
        .update({
          titulo,
          tipo,
          trilha,
          duracao,
          link,
          atualizado_em: new Date(),
        })
        .returning("*");

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  },
};
