const db = require("../data/dbConfig");

const find = type => {
  if (typeof type == "number") {
    return db("photos")
      .select("*")
      .where({ id: type })
      .first();
  } else if (typeof type == "string") {
    return db("photos")
      .select("*")
      .where({ title: type })
      .first();
  } else {
    return db("photos").select("*");
  }
};

const findById = id => {
  return db("photos")
    .select("*")
    .where({ id })
    .first();
};

const update = (id, updated) => {
  return db("photos")
    .where({ id })
    .update(updated);
};

const findAllByUser = id => {
  return db("photos")
    .select("*")
    .where("user_id", id);
};

const findUser = id => {
  return db("users")
    .select("*")
    .where({ id })
    .first();
};

const remove = id => {
  return db("photos")
    .where({ id })
    .delete();
};

const add = photo => {
  return db("photos")
    .insert(photo, "id")
    .then(id => find(...id));
};

module.exports = {
  find,
  findUser,
  findById,
  findAllByUser,
  add,
  update,
  remove
};
