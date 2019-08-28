const knex = require("knex");

const dbConfig = require("../../knexfile");
const db = knex(dbConfig.development);

module.exports = {
  getUsers: id => {
    if (id) {
      return db("users").where("id", id);
    }
    return db("users");
  },
  login: username => {
    return db("users")
      .where("username", username)
      .first();
  },
  addUser: user => {
    return db("users").insert(user);
  },

  updateUser: (id, user) => {
    return db("users")
      .where("id", id)
      .update(user);
  },

  deleteUser: id => {
    return db("users")
      .where("id", id)
      .del();
  }
};
