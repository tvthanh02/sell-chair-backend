const fs = require("fs");
const jwt = require("jsonwebtoken");
// const RSA_PUBLIC_KEY_PATH = "../key/rsa.public.pem";
const RSA_PRIVATE_KEY_PATH = "src/key/rsa.private.pem";

const createAccessToken = (payload, options) => {
  return jwt.sign(payload, fs.readFileSync(RSA_PRIVATE_KEY_PATH), {
    ...options,
    algorithm: "RS256",
    expiresIn: 30 * 60,
  });
};

const createRefreshToken = (payload, options) => {
  return jwt.sign(payload, fs.readFileSync(RSA_PRIVATE_KEY_PATH), {
    ...options,
    algorithm: "RS256",
    expiresIn: "7d",
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
};
