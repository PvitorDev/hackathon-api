const express = require("express");
const { getConteudoTrilha } = require("../controllers/notionController");

const router = express.Router();

router.get("/notion/:trilha", getConteudoTrilha);

module.exports = router;
