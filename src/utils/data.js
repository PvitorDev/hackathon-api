const fs = require("fs/promises");

const searchFullStack = async () => {
  return JSON.parse(await fs.readFile("src/config/notionDB/fullstackDB.json"));
};
const searchQA = async () => {
  return JSON.parse(await fs.readFile(`src/config/notionDB/QaDB.json`));
};
const searchUX = async () => {
  return JSON.parse(await fs.readFile("src/config/notionDB/design.json"));
};

module.exports = {
  searchFullStack,
  searchQA,
  searchUX,
};
