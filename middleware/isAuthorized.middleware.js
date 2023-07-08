const {
  httpErrorCodes,
  httpErrorCodesString,
} = require("../model/statusCode.model");

exports.isAuthorized = (req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res
      .status(httpErrorCodes.UNAUTHORIZED)
      .send(httpErrorCodesString.UNAUTHORIZED);
  }
};
