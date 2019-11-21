// Update with your config settings.
require("dotenv").config();

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./api/data/picmetric.db"
    },
    migrations: {
      directory: "./api/data/migrations"
    },
    seeds: {
      directory: "./api/data/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
      }
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: "knex_migrations",
      directory: "./api/data/migrations"
    },
    seeds: {
      directory: "./api/data/seeds"
    }
  }
};
