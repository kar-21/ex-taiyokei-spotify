const express = require("express");

const userDataController = require('../controller/userProfile.controller');

const router = express.Router();

router.get("/me", userDataController.getUserData);

module.exports = router;