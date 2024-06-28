const express = require("express");

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.send("<h1>Auth</h1>");
});

module.exports = authRouter;
