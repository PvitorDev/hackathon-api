const express = require("express");
const usuarios = require("./usuariosRoutes");
const postagem = require("./postagemRoutes");
const youtube = require("./youtubeRoutes");
const conteudos = require("./conteudosRoutes");

const planos = require("./planosRoutes");
const router = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ message: "Hackathon API FCAMARA" });
  });
  app.use(express.json(), usuarios, postagem, youtube, conteudos, planos);
};

module.exports = router;
