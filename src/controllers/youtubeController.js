const {
  getAlura,
  getFcamara,
  getOrange,
  getRocketseat,
} = require("../utils/data");

  ;

module.exports = {async getVideo (req, res)  {
  const { empresa } = req.params;
  try {
    if (empresa === "fcamara") {
      return res.status(200).json(await getFcamara());
    } else if (empresa === "alura") {
      //QA
      return res.status(200).json(await getAlura());
    } else if (empresa === "orange") {
      //UX e UI
      return res.status(200).json(await getOrange());
    } else if (empresa === "rocketseat") {
      return res.status(200).json(await getRocketseat());
    }
    return res.status(200).json({ message: "empresa invalida" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
} };
