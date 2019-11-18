const db = require("../data/dbConfig");

const findUser = username => {
  return db("users")
    .select("*")
    .where("username", username);
};

const findById = id => {
  return db("users")
    .select("*")
    .where("id", id)
    .first();
};

const addUser = user => {
  return db("users")
    .insert(user)
    .returning("*")
    .then(user => user[0]);
};

module.exports = {
  addUser,
  findById,
  findUser
};
