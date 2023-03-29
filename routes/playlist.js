const express = require("express");
const request = require("request");
const router = express.Router();

router.get("/", (req, res, next) => {
  const authOptions = {
    url: `${process.env.SPOTIFY_BASE_URL}v1/playlists/${req.query.playlistId}/tracks?offset=${req.query.offset}`,
    headers: {
      Authorization: req.headers.authorization,
    },
  };
  request(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  });
});

module.exports = router;