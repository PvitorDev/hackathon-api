const knex = require("../config/database");

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
    req.nome = userLogin.nome; // nome do usuario
    req.nivel = userLogin.nivel; //nivel do usuario
    req.xp = userLogin.xp; //Experiência do usuario
    req.admin = userLogin.admin; //Admin
    req.token = token; 
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = Auth;
