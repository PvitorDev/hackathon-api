const express = require("express");
const getFullStack = require("../controllers/notionController");

const router = express.Router();

router.get("/notion/:trilha", getFullStack);

module.exports = router;
