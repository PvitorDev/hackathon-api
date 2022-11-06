const knex = require("../config/database");

/* CONTEUDOS */
const registrarConteudos = async (req, res) => {
  const { titulo, tipo, trilha, duracao, link } = req.body;
  const nome = req.nome;
  const id = req.user;
  const admin = req.admin;
  try {
    if (!admin) {
      return res.status(404).json({ message: "Você não é um administrador" });
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
      .json({ message: "Conteúdo registrado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const listarConteudos = async (req, res) => {
  const { id_usuario, page = 1 } = req.query;
  try {
    const query = knex("postagem_conteudos")
      .limit(10)
      .offset((page - 1) * 5);

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

    res.header("X-Total-Count", count["count"]);

    const results = await query;
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const listarConteudoTrilha = async (req, res) => {
  const { trilha } = req.params;
  const { id_usuario, page = 1 } = req.query;
  try {
    const query = knex("postagem_conteudos")
      .limit(10)
      .offset((page - 1) * 5);

    const countObj = knex("postagem_conteudos").count();
    if (trilha && !id_usuario) {
      query.where({ trilha }).select("postagem_conteudos.*");

      countObj.where({ trilha });
    } else {
      query
        .where({ trilha })
        .andWhere({ id_usuario })
        .select("postagem_conteudos.*");
    }
    const [count] = await countObj;

    res.header("X-Total-Count", count["count"]);
    const results = await query;
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const detalharConteudo = async (req, res) => {
  const { id_conteudo } = req.query;
  try {
    const results = await knex("postagem_conteudos").where("id", id_conteudo);
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletarConteudo = async (req, res) => {
  const { id_conteudo } = req.query;
  const admin = req.admin;
  try {
    if (!admin) {
      return res.status(404).json({ message: "Você não é um administrador!" });
    }
    await knex("postagem_conteudos").where("id", id_conteudo).del();
    return res.status(204).json({ message: "Conteudo deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* POSTAGEM */

const registrarPostagens = async (req, res) => {
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
    return res.status(500).json({ message: error.message });
  }
};

const listarPostagens = async (req, res) => {
  const { id_usuario, page = 1 } = req.query;
  try {
    const query = knex("postagens")
      .limit(10)
      .offset((page - 1) * 5);

    const countObj = knex("postagens").count();
    if (id_usuario) {
      query
        .where({ id_usuario })
        .join("usuarios", "usuarios.id", "=", "postagens.id_usuario")
        .select("postagens.*", "usuarios.nome");

      countObj.where({ id_usuario });
    }
    const [count] = await countObj;

    res.header("X-Total-Count", count["count"]);

    const results = await query;
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* COMENTARIO */

const registrarComentario = async (req, res) => {
  const { comentario } = req.body;
  const id = req.user;
  try {
    await knex("comentarios").insert({
      id_usuario: id,
      comentario,
    });
    return res.status(201).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const listarComentario = async (req, res) => {
  const { idPosts } = req.body;
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* CURTIDA */

const curtiPostagem = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registrarConteudos,
  registrarPostagens,
  registrarComentario,
  listarConteudos,
  listarPostagens,
  listarComentario,
  curtiPostagem,
  listarConteudoTrilha,
  detalharConteudo,
  deletarConteudo,
};
