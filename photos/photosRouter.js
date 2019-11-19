const router = require("express").Router();
const authenticated = require("../middleware/authenticated");

router.get("/:id", authenticated, (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: `id: ${id} Photos`
  });
});

router.put("/:id", authenticated, (req, res) => {
  const { id } = req.params;

  res.status(200).json({ message: `Updated photo id: ${id}` });
});

module.exports = router;
