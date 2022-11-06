const knex = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cadastrarUsuarios = async (req, res) => {
  const { nome, email, senha, trilha } = req.body;
  try {
    const existeEmail = await knex("usuarios").where({ email }).first();
    if (existeEmail) {
      return res
        .status(400)
        .json({ mensagem: "Ja existe uma conta cadastrada com este email" });
    }
    const encryptedSenha = await bcrypt.hash(senha, 10);
    await knex("usuarios").insert({
      nome,
      email,
      trilha,
      senha: encryptedSenha,
    });
    return res.status(201).json({ mensagem: "Cadastro realizado!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const validarEmail = await knex("usuarios").where({ email }).first();
    if (!validarEmail) {
      return res
        .status(404)
        .json({ mensagem: "Não conseguimos identificar o Email usado" });
    }

    const validarSenha = await bcrypt.compare(senha, validarEmail.senha);
    if (!validarSenha) {
      return res.status(404).json({ mensagem: "Senha incorreta" });
    }

    const token = jwt.sign(
      {
        id: validarEmail.id,
        nome: validarEmail.nome,
        email: validarEmail.email,
      },
      process.env.SENHA_JWT,
      { expiresIn: "2h" },
    );
    const { senha: _, ...userData } = validarEmail;
    return res.status(200).json({ userData, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha, trilha } = req.body;
  const { user } = req;

  try {
    const validarEmail = await knex("usuarios")
      .where({ email })
      .andWhere("id", "<>", user)
      .first();
    if (validarEmail) {
      return res
        .status(400)
        .json({ mensagem: "O email informado já existe cadastrado" });
    }
    const encryptedSenha = await bcrypt.hash(senha, 10);
    await knex("usuarios")
      .where({ id: req.user })
      .update({
        nome,
        email,
        senha: encryptedSenha,
        trilha,
        atualizado_em: new Date(),
      })
      .returning("*");

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const listarUsuarios = async (req, res) => {
  const { trilha } = req.params;
  const admin = req.admin;
  let results;
  let numero_usuarios;
  try {
    if (!admin) {
      return res.status(404).json({ message: "Você não é um administrador" });
    }

    if (!trilha) {
      results = await knex("usuarios");
      numero_usuarios = results.length;
    } else {
      results = await knex("usuarios").where({ trilha });
      numero_usuarios = results.length;
    }
    return res.status(200).json({ results, numero_usuarios });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const detalharUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioId = await knex("usuarios").where({ id }).first();
    const { senha: _, ...userData } = usuarioId;
    return res.status(200).json({ ...userData });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deletarConta = async (req, res) => {
  const { id } = req.params;
  const admin = req.admin;
  const id_usuario = req.user;
  try {
    if (!admin) {
      const deletarMinhaConta = await knex("usuarios")
        .where({ id })
        .andWhere("id", id_usuario)
        .first()
        .del();
      if (!deletarMinhaConta) {
        return res
          .status(404)
          .json({ message: "Você não é um administrador!" });
      }
    } else {
      await knex("usuarios").where({ id }).first().del();
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const tornarAdministrador = async (req, res) => {
  const { id } = req.params;
  const admin = req.admin;
  try {
    if (!admin) {
      return res.status(404).json({ message: "Você não é um administrador" });
    }
    await knex("usuarios")
      .where({ id })
      .update({
        admin,
        atualizado_em: new Date(),
      })
      .returning("*");
    return res.status(200).json({ message: "Usuario atualizado" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  cadastrarUsuarios,
  login,
  atualizarUsuario,
  listarUsuarios,
  detalharUsuario,
  deletarConta,
  tornarAdministrador,
};
