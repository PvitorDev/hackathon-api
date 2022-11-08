const knex = require("../config/database");

module.exports = {
  async getVideo(req, res) {
    const { empresa } = req.params;
    const criador_nome = empresa;
    try {
      const videosPlaylist = await knex("youtube").where({ criador_nome });
      return res.status(200).json(videosPlaylist);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
};
