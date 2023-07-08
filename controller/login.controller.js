const { v4: uuidV4 } = require("uuid");
const request = require("request");

exports.getLoginUri = (req, res, next) => {
  const state = uuidV4();
  res.send({
    url:
      `${process.env.ACCOUNT_SPOTIFY_BASE_URL}authorize?` +
      new URLSearchParams({
        response_type: "code",
        client_id: process.env.CLIENT_ID,
        scope: process.env.SCOPE,
        redirect_uri: process.env.REDIRECT_URL,
        state: state,
      }),
  });
};

exports.getRedirectUri = (req, res, next) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  if (state === null) {
    res.redirect(
      "/#" +
        new URLSearchParams({
          error: "state_mismatch",
        })
    );
  } else {
    const authOptions = {
      url: `${process.env.ACCOUNT_SPOTIFY_BASE_URL}api/token`,
      form: {
        code: code,
        redirect_uri: process.env.REDIRECT_URL,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization: `Basic ${new Buffer(
          `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      json: true,
    };
    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const object = {
          access_token: body.access_token,
          token_type: body.token_type,
          scope: body.scope,
          expires_in: body.expires_in,
          refresh_token: body.refresh_token,
        };
        res.redirect(
          `${process.env.FRONTEND_URL}login/redirectURI?${new URLSearchParams({
            ...object,
          })}`
        );
      } else {
        const errorBody = JSON.parse(body);
        res.status(errorBody.error.status).send(errorBody.error.message);
      }
    });
  }
};

exports.getRefreshToken = (req, res, next) => {
  const authOptions = {
    url: `${process.env.ACCOUNT_SPOTIFY_BASE_URL}api/token`,
    form: {
      refresh_token: req.query.refresh_token,
      grant_type: "refresh_token",
    },
    headers: {
      Authorization: `Basic ${new Buffer(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log(">>>> refresh", response, body);
      const object = {
        access_token: body.access_token,
        token_type: body.token_type,
        scope: body.scope,
        expires_in: body.expires_in,
        refresh_token: body.refresh_token,
      };
      res.send(object);
    } else {
      const errorBody = JSON.parse(body);
      res.status(errorBody.error.status).send(errorBody.error.message);
    }
  });
};
