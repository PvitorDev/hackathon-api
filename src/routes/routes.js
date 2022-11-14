const express = require("express");
const usuarios = require("./usuariosRoutes");
const postagem = require("./postagemRoutes");
const youtube = require("./youtubeRoutes");
const conteudos = require("./conteudosRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("../swagger.json");
const planos = require("./planosRoutes");
const router = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ message: "Hackathon API FCAMARA" });
  });
  app.use(express.json(), usuarios, postagem, youtube, conteudos, planos);
  app.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = router;
