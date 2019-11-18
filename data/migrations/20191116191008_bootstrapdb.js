require("dotenv").config();

exports.up = function(knex) {
  return knex.schema

    .createTable("users", tbl => {
      tbl.increments();

      tbl
        .string("username", 255)
        .notNullable()
        .unique();
      tbl.string("password", 255).notNullable();
    })

    .createTable("photos", tbl => {
      tbl.increments();

      tbl.string("title", 255).notNullable();
      tbl.string("url", 255).notNullable();
      tbl.increments();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
