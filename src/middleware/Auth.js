const knex = require("../config/database/database");

const jwt = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ mensagem: "Faça login ou cria uma conta" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, process.env.SENHA_JWT);

    const userLogin = await knex("usuarios").where({ id }).first();

    req.user = userLogin.id; // id do usuario
    next();
  } catch (error) {}
};

module.exports = Auth;
