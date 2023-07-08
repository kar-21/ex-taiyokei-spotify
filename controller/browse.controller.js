const request = require("request");

exports.getFeaturePlaylist = (req, res, next) => {
  const authOptions = {
    url: `${process.env.SPOTIFY_BASE_URL}v1/browse/featured-playlists`,
    headers: {
      Authorization: req.headers.authorization,
    },
  };
  request(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      console.log(body)
      const errorBody = JSON.parse(body);
      res.status(errorBody.error.status).send(errorBody.error.message);
    }
  });
};

exports.getCategories = (req, res, next) => {
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
      res.send(body);
    } else {
      const errorBody = JSON.parse(body);
      res.status(errorBody.error.status).send(errorBody.error.message);
    }
  });
};

exports.getCategoryPlaylists = (req, res, next) => {
  const authOptions = {
    url: `${process.env.SPOTIFY_BASE_URL}v1/browse/categories/${req.query.categoryId}/playlists?offset=${req.query.offset}`,
    headers: {
      Authorization: req.headers.authorization,
    },
  };
  request(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      const errorBody = JSON.parse(body);
      res.status(errorBody.error.status).send(errorBody.error.message);
    }
  });
};

exports.getAvailableGenre = (req, res, next) => {
  const authOptions = {
    url: `${process.env.SPOTIFY_BASE_URL}v1/recommendations/available-genre-seeds`,
    headers: {
      Authorization: req.headers.authorization,
    },
  };
  request(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      const errorBody = JSON.parse(body);
      res.status(errorBody.error.status).send(errorBody.error.message);
    }
  });
};
