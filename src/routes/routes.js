const express = require("express");
const notion = require("./notionRoutes");
const usuarios = require("./usuariosRoutes");
const router = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ message: "Hackathon api" });
  });
  app.use(express.json(), notion, usuarios);
};

module.exports = router;
