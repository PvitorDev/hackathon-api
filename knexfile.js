// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: process.env.DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    migrations: {
      directory: `${__dirname}/src/config/migrations`,
    },
  },
  production: {
    client: "pg",
    connection: {
      user: process.env.DB_USER,
      database: process.env.DATABASE,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: `${__dirname}/src/config/migrations`,
    },
  },
};
