const express = require("express");

const playlistController = require('../controller/playlist.controller');

const router = express.Router();

router.get("/", playlistController.getPlaylist);

module.exports = router;