// Update with your config settings.
require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    useNullAsDefault: true,
    connection: {
      database: process.env.DEV_DB,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASSWORD
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  production: {
    client: "pg",
    useNullAsDefault: true,
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
