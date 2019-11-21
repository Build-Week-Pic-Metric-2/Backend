const authorized = (req, res, next) => {
  console.log({ username: req.session.username });
  if (req.session && req.session.username) {
    next();
  } else {
    res.status(401).json({ message: "You don't have valid credentials." });
  }
};

module.exports = authorized;
