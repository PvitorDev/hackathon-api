const joi = require("joi");

const schemaUser = joi.object({
  email: joi.string().required().messages({
    "string.email": "O campo email precisa ter um formato válido",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
  }),
  senha: joi
    .string()
    .messages({
      "any.required": "O campo senha é obrigatório",
      "string.empty": "O campo senha é obrigatório",
    })
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

module.exports = schemaUser;
