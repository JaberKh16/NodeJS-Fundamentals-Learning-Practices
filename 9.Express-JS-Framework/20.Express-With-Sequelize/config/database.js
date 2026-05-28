const { Sequelize, Model } = require("sequelize");
// const config = require("../config/config");
// const env = process.env.NODE_ENV || 'development';
// const dbConfig = config[env];


const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  databse: process.env.DB_DATABASENAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  host: process.env.DB_DIALECT,
  logging: console.log, // set the default
});


// create a new Sequelize instance using the configuration parameters from the config file
// const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
//   host: dbConfig.host,
//   port: dbConfig.port,
//   dialect: dbConfig.dialect,
//   logging: console.log, // set the default logging function to console.log
// });


module.exports = sequelize;
