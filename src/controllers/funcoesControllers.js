const knex = require("../config/database");

const upExperiencia = async (req, res) => {
  const { xp } = req.params;
  try {
    const newXp = Number(xp) + req.xp;
    const usuario = await knex("usuarios").where({ id: req.user }).first();

    await knex("usuarios").where({ id: req.user }).update({
      xp: newXp,
    });
    res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = upExperiencia;
