const knexfile = require("../../../knexfile");

<<<<<<< HEAD
const knex = require("knex")(knexfile["production"]);
=======
const knex = require("knex")(knexfile[process.env.KNEXFILE]);
>>>>>>> dev

module.exports = knex;
