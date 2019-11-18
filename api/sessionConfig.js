const knexConnection = require("../data/dbConfig");

const config = KnexSessionStorage => {
  return {
    name: "crypt-web",
    secret: process.env.COOKIE_SECRET || "is it secret? is it safe?",
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: true
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStorage({
      knex: knexConnection,
      clearInterval: 1000 * 60 * 10,
      tablename: "user_sessions",
      sidfieldname: "id",
      createtable: true
    })
  };
};

module.exports = {
  config
};
