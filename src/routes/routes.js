const express = require("express");
const notion = require("./notionRoutes");
const usuarios = require("./usuariosRoutes");
const conteudos = require("./conteudosRoutes");
const youtube = require("./youtubeRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("../swagger.json");
const router = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ message: "Hackathon API FCAMARA" });
  });
  app.use(express.json(), notion, usuarios, conteudos, youtube);
  app.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = router;
