const express = require("express");


const loginController = require('../controller/login.controller');

const router = express.Router();

/* GET home page. */
router.get("/", loginController.getLoginUri);

router.get("/redirectURI", loginController.getRedirectUri);

router.get("/refreshToken", loginController.getRefreshToken);

module.exports = router;
