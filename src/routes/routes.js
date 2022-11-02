const express = require("express");
const notion = require("./notionRoutes");
const usuarios = require("./usuariosRoutes");
const conteudos = require("./conteudosRoutes");
const router = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ message: "Hackathon API FCAMARA" });
  });
  app.use(express.json(), notion, usuarios, conteudos);
};

module.exports = router;
