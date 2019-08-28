exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table
      .string("username")
      .notNullable()
      .unique();
    table.string("password").notNullable();
    table.string("email").notNullable();
    table.boolean("isOrganizer").defaultTo(false);
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
