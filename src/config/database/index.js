const knexfile = require("../../../knexfile");

const knex = require("knex")(knexfile[process.env.KNEXFILE]);

module.exports = knex;
