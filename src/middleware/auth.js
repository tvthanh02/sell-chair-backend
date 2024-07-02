const jwt = require("jsonwebtoken");
const fs = require("fs");
const db = require("../models");

const authorize = (req, res, next) => {
  const { authorization } = req.headers;

  !authorization &&
    res.status(401).json({
      error: 1,
      message: "Unauthorized",
    });

  const accessToken = authorization.slice(7);

  jwt.verify(
    accessToken,
    fs.readFileSync("src/key/rsa.public.pem"),
    function (err, decoded) {
      err &&
        res.status(403).json({
          error: 1,
          message: "Forbidden",
        });
      req.headers.accessToken = accessToken;
      req.headers.payload = decoded;
      next();
    }
  );
};

const isAmin = (req, res, next) => {
  const { payload } = req.headers;
  const user = db.User.findOne({ where: { id: payload.id } });
  user?.roleId !== 1 &&
    res.status(403).json({
      error: 1,
      message: "Forbidden",
    });
  next();
};

module.exports = {
  authorize,
  isAmin,
};
