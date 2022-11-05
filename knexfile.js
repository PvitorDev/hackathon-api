// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    migrations: {
      directory: `${__dirname}/src/config/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/config/seeds`,
    },
  },
  production: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: `${__dirname}/src/config/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/config/seeds`,
    },
  },
};
