const knex = require("../config/database");


/* CONTEUDOS */
const registrarConteudos = async (req, res) => {
  const { titulo, tipo, duracao, link } = req.body;
  const nome = req.nome;
  const id = req.user;
  const admin = req.admin;
  try {
    if (!admin) {
      return res.status(404).json({ message: "Você não é um administrador" });
    }
 const conteudo =   await knex("conteudos").insert({
      id_usuario: id,
      titulo,
      tipo,
      criador_nome: nome,
      duracao,
      link,
    });
    return res.status(201).json(conteudo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const pegarConteudoUsuario = async (req, res) => {
  const { id_usuario, page } = req.query;
  try {
    const query = knex("conteudos")
      .limit(5)
      .offset((page - 1) * 5);
    const countObj = knex("conteudos").count();

    if (id_usuario) {
      query
        .where({ id_usuario })
        .join("usuarios", "usuarios.id", "=", "conteudos.id_usuario")
        .select("conteudos.*", "usuarios.nome");

      countObj.where({ id_usuario });
    }

    const [count] = await countObj;

    res.header("X-Total-Count", count["count"]);

    const results = await query;

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



/* POSTAGENS */
const registrarPostagens = async (req, res) => {
  const { titulo, descricao, tipo } = req.body;
  const nome = req.nome;
  const id = req.user;
  try {
   const postagem = await knex("postagens").insert({
      id_usuario: id,
      titulo,
      descricao,
      tipo,
      criador_nome: nome,
    });
    return res.status(201).json(postagem);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



/* COMENTÁRIOS*/

const registrarComentario = async (req, res) => {
  const { comentario } = req.body;
  const id = req.user;
  const id_post = req.query
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

module.exports = {
  registrarConteudos,
  registrarPostagens,
  registrarComentario,
  pegarConteudoUsuario,
};
