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
    connection: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    migrations: {
      directory: `${__dirname}/src/config/migrations`,
    },
  },
};
