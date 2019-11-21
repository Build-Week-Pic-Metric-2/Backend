const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Auth = require("./auth-model");

router.post("/register", (req, res) => {
  let { username, password } = req.body;

  if ((username, password)) {
    const hash = bcrypt.hashSync(password, 14);
    password = hash;

    Auth.add({ username, password })
      .then(user => {
        const u = { id: user.id, username: user.username };
        req.session.username = username;
        res.status(201).json(u);
      })
      .catch(error => {
        console.log(error);
        res.header = {
          "Access-Control-Allow-Credentials": true
        };
        res
          .status(500)
          .json({ message: "An account with this username already exits." });
      });
  } else {
    res
      .status(401)
      .json({ message: "Please be sure to provide a username & password." });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    Auth.find(username).then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const { id, username } = user;
        req.session.username = username;
        res.status(200).json({ id, username });
      } else {
        res
          .status(404)
          .json({ message: "We could not find a username that matched." });
      }
    });
  } else {
    res
      .status(401)
      .json({ message: "Please be sure to provide a username & password." });
  }
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.status(200).json({ message: "Logged out successfully." });
  } else {
    res.status(404).json({ message: "No session found." });
  }
});

module.exports = router;
