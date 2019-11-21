exports.up = function(knex) {
  return knex.schema
    .createTable("users", t => {
      t.increments();
      t.string("username", 255)
        .unique()
        .notNullable();

      t.string("password", 255).notNullable();
    })
    .createTable("photos", t => {
      t.increments();

      t.string("title", 255).notNullable();
      t.string("url", 255).notNullable();

      // Foreign User ID
      t.integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("analysis", t => {
      t.increments();

      t.string("object", 255).notNullable();

      t.integer("count").notNullable();

      // Foreign Photo ID
      t.integer("photo_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("photos")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable("analysis")
    .dropTable("photos")
    .dropTable("users");
};
