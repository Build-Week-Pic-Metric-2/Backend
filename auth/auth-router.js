const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Register = require("../users/register-model");
const Login = require("../users/login-model");

router.post("/register", (req, res) => {
  let { username, password } = req.body;

  if (username && password) {
    const hash = bcrypt.hashSync(password, 10);
    password = hash;
    Register.addUser({ username, password })
      .then(user => {
        const { id, username } = user;

        req.session.username = username;
        res.status(201).json({ id, username });
      })
      .catch(error => {
        console.log(`Registration error: ${error}`);
        res.status(500).json({ message: "username is not available." });
      });
  } else {
    res
      .status(401)
      .json({ message: "Please be sure to provide a username and password." });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Login.findUser(username)
    .then(user => {
      let { id, username } = user;
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username;
        res.status(200).json({ id, username });
      } else {
        res.status(401).json({ message: "Invalid credentials provided." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong while validating the credentials."
      });
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.status(200).json({ message: "Logged out successfully." });
  } else {
    res.status(200).json({ message: "No session was found." });
  }
});

module.exports = router;
