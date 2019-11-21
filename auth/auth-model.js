const db = require("../api/data/dbConfig");

const find = type => {
  console.log(type);
  if (typeof type == "number") {
    return db("users")
      .select("*")
      .where({ id: type })
      .first();
  } else if (typeof type == "string") {
    return db("users")
      .select("*")
      .where({ username: type })
      .first();
  } else {
    return db("users").select("*");
  }
};

const add = user => {
  return db("users")
    .insert(user, "id")
    .then(id => find(...id));
};

module.exports = {
  find,
  add
};
