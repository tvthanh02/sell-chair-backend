const express = require("express");
const https = require("https");
const fs = require("fs");
require("dotenv").config();
const router = require("./src/routes");

// app
const app = express();

//env
const PORT = process.env.PORT;
const KEY_PATH = process.env.KEY;
const CERT_PATH = process.env.CERT;

// middleware
app.use(express.json());

//routing
app.use("/api/v1/", router);

app.listen = function () {
  console.log("server is running on port : " + PORT);
  // create server with ssl https
  return https
    .createServer(
      {
        key: fs.readFileSync(KEY_PATH),
        cert: fs.readFileSync(CERT_PATH),
      },
      this
    )
    .listen(PORT);
};

app.listen();
