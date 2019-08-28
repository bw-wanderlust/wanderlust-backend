const faker = require('faker')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("trips")
    .del()
    .then(function() {
      let trips = [];
      for (let i = 0; i < 10; i++) {
        trips.push({
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          organizerId: 1,
          location: faker.address.streetAddress(),
          cost: faker.finance.amount().toString(),
          isFree: false,
          startDate: faker.date.recent(),
          endDate: faker.date.future()
        });
      }
      return knex("trips").insert(trips);
    });
};
