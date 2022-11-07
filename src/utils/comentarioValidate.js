const joi = require("joi");

const schemaComentario = joi.object({
  comentario: joi.string().required().messages({
    "string.comentario": "O campo comentario precisa ter um formato válido",
    "any.required": "O campo comentario é obrigatório",
    "string.empty": "O campo comentario é obrigatório",
  }),
});

module.exports = schemaComentario;
