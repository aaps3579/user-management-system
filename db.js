const { Sequelize, ValidationError } = require("sequelize");
// dialect can be sqlite, mysql , postgres
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false,
});

module.exports = {
  sequelize,
  Sequelize,
  ValidationError,
};
