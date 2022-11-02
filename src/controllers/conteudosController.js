const knex = require("../config/database/database");

const registrarConteudos = async (req, res) => {
  const { titulo, tipo, duracao, link } = req.body;
  const nome = req.nome;
  const id = req.user;
  try {
    await knex("conteudos").insert({
      id_usuario: id,
      titulo,
      tipo,
      criador_nome: nome,
      duracao,
      link,
    });
    return res.status(201).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const registrarPerguntas = async (req, res) => {
  const { titulo, descricao, tipo } = req.body;
  const nome = req.nome;
  const id = req.user;
  try {
    await knex("perguntas").insert({
      id_usuario: id,
      titulo,
      descricao,
      tipo,
      criador_nome: nome,
    });
    return res.status(201).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const registrarRespostas = async (req, res) => {
  const { resposta } = req.body;
  const id = req.user;
  try {
    await knex("respostas").insert({
      id_usuario: id,
      resposta,
    });
    return res.status(201).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { registrarConteudos, registrarPerguntas, registrarRespostas };
