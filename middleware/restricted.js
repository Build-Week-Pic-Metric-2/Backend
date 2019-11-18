const restricted = (req, res, next) => {
  if (req.path.includes("/middleware/restricted")) {
    if (req.session && req.session.username) {
      next();
    } else {
      res.status(401).json({ you: "cannot pass!" });
    }
  } else {
    next();
  }
};

module.exports = restricted;
