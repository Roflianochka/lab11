const { Sequelize } = require("sequelize");

module.exports = new Sequelize("AssetGuardian", "username", "1111", {
  dialect: "postgres",
  host: "localhost",
  port: "5432",
});
