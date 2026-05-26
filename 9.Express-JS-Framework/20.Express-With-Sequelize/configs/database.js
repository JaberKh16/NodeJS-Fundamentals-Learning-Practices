const { Sequelize, Model } = require("sequelize");

const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  databse: process.env.DB_DATABASENAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  host: process.env.DB_DIALECT,
  logging: console.log, // set the default
});

module.exports = sequelize;
