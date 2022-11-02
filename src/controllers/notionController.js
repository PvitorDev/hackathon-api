const { searchFullStack, searchQA, searchUX } = require("../utils/data");

const getFullStack = async (req, res) => {
  const { trilha } = req.params;

  try {
    let fullstack = await searchFullStack();
    let QA = await searchQA();
    let design = await searchUX();
    if (trilha === "fullstack") {
      //fullstack
      return res.status(200).json(fullstack);
    } else if (trilha === "qa") {
      //QA
      return res.status(200).json(QA);
    } else if (trilha === "design") {
      //UX e UI
      return res.status(200).json(design);
    }
    return res.status(200).json({ message: "Trilha invalida" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getFullStack;
