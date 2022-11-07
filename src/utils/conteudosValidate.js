const joi = require("joi");

const schemaConteudo = joi.object({
  titulo: joi.string().required().messages({
    "any.required": "O campo titulo é obrigatório",
    "string.empty": "O campo titulo é obrigatório",
  }),
  tipo: joi.string().required().messages({
    "string.tipo": "O campo tipo precisa ter um formato válido",
    "any.required": "O campo tipo é obrigatório",
    "string.empty": "O campo tipo é obrigatório",
  }),
  trilha: joi.string().required().messages({
    "string.trilha": "O campo trilha precisa ter um formato válido",
    "any.required": "O campo trilha é obrigatório",
    "string.empty": "O campo trilha é obrigatório",
  }),
  duracao: joi.string(),
  link: joi.string().required().messages({
    "string.link": "O campo link precisa ter um formato válido",
    "any.required": "O campo link é obrigatório",
    "string.empty": "O campo link é obrigatório",
  }),
});

module.exports = schemaConteudo;
