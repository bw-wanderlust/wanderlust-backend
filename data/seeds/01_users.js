exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "test",
          password: "test",
          email: "email@test.com",
          firstName: "name",
          lastName: "lastName"
        },
        {
          id: 2,
          username: "test2",
          password: "test2",
          email: "email@test.com",
          firstName: "name",
          lastName: "lastName"
        },
        {
          id: 3,
          username: "teat3",
          password: "test3",
          email: "email@test.com",
          firstName: "name",
          lastName: "lastName"
        }
      ]);
    });
};
