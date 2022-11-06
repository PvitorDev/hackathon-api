const fs = require("fs/promises");

const searchFullStack = async () => {
  return JSON.parse(await fs.readFile("src/config/notionDB/fullstack.json"));
};
const searchQA = async () => {
  return JSON.parse(await fs.readFile(`src/config/notionDB/qa.json`));
};
const searchUX = async () => {
  return JSON.parse(await fs.readFile("src/config/notionDB/ux.json"));
};


const getFcamara = async () => {
  return JSON.parse(await fs.readFile("src/config/youtube/fcamara.json"));
};
const getAlura = async () => {
  return JSON.parse(await fs.readFile("src/config/youtube/alura.json"));
};
const getOrange = async () => {
  return JSON.parse(await fs.readFile("src/config/youtube/orange.json"));
};
const getRocketseat = async () => {
  return JSON.parse(await fs.readFile("src/config/youtube/rocketseat.json"));
};

module.exports = {
  searchFullStack,
  searchQA,
  searchUX,
  getFcamara,
  getAlura,
  getOrange,
  getRocketseat,
};
