const db = require("../data/dbConfig");

const findUser = username => {
  return db("users")
    .select("*")
    .where("username", username)
    .first();
};

module.exports = {
  findUser
};
