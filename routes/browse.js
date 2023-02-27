const express = require("express");
const request = require("request");
const fs = require("fs");
const router = express.Router();

router.get("/featured-playlists", (req, res, next) => {
  const authOptions = {
    url: `${process.env.SPOTIFY_BASE_URL}v1/browse/featured-playlists`,
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
router.get("/categories", (req, res, next) => {
  console.log(">>>>> cat", req.query.offset);
  const authOptions = {
    url: `${
      process.env.SPOTIFY_BASE_URL
    }v1/browse/categories?${new URLSearchParams({
      offset: req.query.offset,
    })}`,
    headers: {
      Authorization: req.headers.authorization,
    },
  };
  request(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        console.log(">>>>>", response);
      res.send(body);
    }
  });
});

router.get("/category/playlists", (req, res, next) => {
    console.log(">>>>> cat", req.params.offset);
    const authOptions = {
      url: `${
        process.env.SPOTIFY_BASE_URL
      }v1/browse/categories/${req.params.categoryId}/playlists`,
      headers: {
        Authorization: req.headers.authorization,
      },
    };
    request(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
          console.log(">>>>>", response);
        res.send(body);
      }
    });
  });

router.get("/available-genre", (req, res, next) => {
  const authOptions = {
    url: `${process.env.SPOTIFY_BASE_URL}v1/recommendations/available-genre-seeds`,
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
