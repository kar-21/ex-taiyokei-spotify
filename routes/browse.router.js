const express = require("express");

const browseController = require("../controller/browse.controller");
const { isAuthorized } = require('../middleware/isAuthorized.middleware');

const router = express.Router();

router.get("/featured-playlists", isAuthorized, browseController.getFeaturePlaylist);

router.get("/categories", isAuthorized, browseController.getCategories);

router.get("/category/playlists/", isAuthorized, browseController.getCategoryPlaylists);

router.get("/available-genre", isAuthorized, browseController.getAvailableGenre);

module.exports = router;
