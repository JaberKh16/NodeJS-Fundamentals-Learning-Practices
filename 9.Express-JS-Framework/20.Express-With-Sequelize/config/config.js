// set the dotenv path
require('dotenv').config({ path: process.cwd() + '/.env' });

module.exports =  {
  "development": {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    databse: process.env.DB_DATABASENAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: console.log, // set the default
  },
  "test": {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    databse: process.env.DB_DATABASENAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: console.log, // set the default
  },
  "production": {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    databse: process.env.DB_DATABASENAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false, // set to false to disable logging in production
  }
}
