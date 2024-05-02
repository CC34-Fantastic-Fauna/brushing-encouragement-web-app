const config = require('./../knexfile');
const knex = require('knex');

const environement = (process.env.NODE_ENV && process.env.NODE_ENV === "production") ? "production" : "development";

module.exports = knex(config[environement]);