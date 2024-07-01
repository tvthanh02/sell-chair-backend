const fs = require("fs");
require("process");

module.exports = {
  development: {
    username: "root",
    password: "12345678",
    database: "sell-chair-db",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    charset: "utf8",
    collate: "utf8_general_ci",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: process.env.DB_DEV_USER,
    password: process.env.DB_DEV_PASSWORD,
    database: process.env.DB_DEV_NAME,
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    charset: "utf8",
    collate: "utf8_general_ci",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: "mysql",
    charset: "utf8",
    collate: "utf8_general_ci",
    dialectOptions: {},
  },
};
