const express = require("express");
const request = require("request");
const fs = require("fs");
const router = express.Router();

router.get("/me", (req, res, next) => {
  const accessToken = fs.readFileSync("./access_token.txt");
  console.log('>>>>> req', req.headers.authorization)
  const authOptions = {
    url: `${process.env.SPOTIFY_BASE_URL}v1/me`,
    headers: {
      Authorization: req.headers.authorization,
    },
  };
  request(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log(">>>>>", body);
      res.send(body);
    }
  });
});

module.exports = router;