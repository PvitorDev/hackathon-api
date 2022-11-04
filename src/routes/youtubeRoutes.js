const express = require("express");
const { getVideo } = require("../controllers/youtubeController");
const router = express.Router();

router.get("/youtube/:empresa", getVideo);

module.exports = router;
