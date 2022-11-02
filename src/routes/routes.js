const express = require("express");
const notion = require("./notionRoutes");
const router = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ message: "Hackathon api" });
  });
  app.use(express.json(), notion);
};

module.exports = router;
