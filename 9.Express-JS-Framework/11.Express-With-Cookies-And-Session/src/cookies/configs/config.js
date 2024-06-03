const key = process.env.NODE_ENV || 'secret';
// eslint-disable-next-line import/no-dynamic-require
const credentials = require(`./crendentials.${key}`);
console.log(credentials);

module.exports = { credentials };
