const knex = require("../config/database");

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

const pegarConteudos = async (req, res) => {
  const { trilha } = req.params;
  try {
    const tiposTrilha = await knex("conteudos").where("tipo", trilha);

    res.status(200).json(tiposTrilha);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const procurarPerguntas = async (req, res) => {
  const { search } = req.query;
  try {
    const tituloPergunta = await knex("perguntas").where("titulo", search);

    res.status(200).json(tituloPergunta);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const pegarRespostas = async (req, res) => {
  const { idPergunta } = req.body;
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  registrarConteudos,
  registrarPerguntas,
  registrarRespostas,
  pegarConteudos,
  procurarPerguntas,
  pegarRespostas,
};
