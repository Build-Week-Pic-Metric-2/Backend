const db = require('../data/dbConfig');

const find = () => {
  return db('users')
    .select('id', 'username')
    .orderBy('id');
};

const findByPassword = password => {
  return db('users')
    .select('*')
    .where('password', password)
    .first();
};

const findUserByUsername = username => {
  return db('users')
    .select('*')
    .where('username', username)
    .first();
};

module.exports = {
  find,
  findUserByUsername,
  findByPassword
};
