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

      tbl
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })

    .createTable("analysis", tbl => {
      tbl.increments();

      tbl.string("title", 255).notNullable();
      tbl.string("url", 255).notNullable();
      tbl.string("user_id", 255).notNullable();
      tbl.string("description", 255).notNullable();

      tbl
        .integer("photo_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("photos")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTable("photos")
    .dropTable("analysis");
};
