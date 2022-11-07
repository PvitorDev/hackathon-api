const joi = require("joi");

const schemaPost = joi.object({
  titulo: joi.string().required().messages({
    "any.required": "O campo titulo é obrigatório",
    "string.empty": "O campo titulo é obrigatório",
  }),
  tipo: joi.string().required().messages({
    "string.tipo": "O campo tipo precisa ter um formato válido",
    "any.required": "O campo tipo é obrigatório",
    "string.empty": "O campo tipo é obrigatório",
  }),
  descricao: joi.string().required().messages({
    "string.descricao": "O campo descrição precisa ter um formato válido",
    "any.required": "O campo descrição é obrigatório",
    "string.empty": "O campo descrição é obrigatório",
  }),
});

module.exports = schemaPost;
