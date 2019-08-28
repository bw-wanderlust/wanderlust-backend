const knex = require("knex");

const dbConfig = require("../../knexfile");
const db = knex(dbConfig.development);

module.exports = {
  getTrips: id => {
    if (id) {
      return db("trips").where("id", id);
    }
    return db("trips");
  },
  addTrip: trip => {
    return db("users").insert(user);
  },

  updateTrip: (id, trip) => {
    return db("trips")
      .where("id", id)
      .update(trip);
  },

  deleteTrip: id => {
    return db("trips")
      .where("id", id)
      .del();
  }
};
