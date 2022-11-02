const express = require("express");

const { cadastrarUsuarios, login } = require("../controllers/usersController");

const router = express.Router();

router.post("/usuarios", cadastrarUsuarios).post("/login", login);

module.exports = router;
