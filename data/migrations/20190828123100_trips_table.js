exports.up = function(knex) {
  return knex.schema.createTable("trips", table => {
    table.increments();
    table.string("title").notNullable();
    table.string("description");
    table
      .integer("organizerId")
      .unsigned()
      .references("id")
      .inTable("users");
    table.string("location").notNullable();
    table.string("cost");
    table.boolean("isFree").defaultTo(false);
    table.date("startDate").notNullable();
    table.date("endDate").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("trips");
};
