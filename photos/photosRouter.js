const router = require("express").Router();
const fs = require("fs");
const multer = require("multer");
const authenticated = require("../middleware/authenticated");
const Photos = require("./photos-model");

const handleError = (err, res) => {
  res.status(500).json("Oops.. something went wrong!");
};

const upload = multer({
  dest: "../uploads"
});

// CREATE
router.post("/:id", upload.single("file", "file-upload"), (req, res) => {
  const tempPath = req.file.path;
  const targetPath = path.join(
    __dirname,
    `../uploads/image${path.extname(req.file.originalname)}`
  );

  if (
    path.extname(req.file.originalname).toLowerCase() === ".png" ||
    path.extname(req.file.originalname).toLowerCase() === ".jpg"
  ) {
    fs.rename(tempPath, targetPath, err => {
      if (err) return handleError(err, res);

      res.status(200).json({ message: "file uploaded!" });
    });
  } else {
    fs.unlink(tempPath, err => {
      if (err) return handleError(err, res);

      res.status(403).json({ message: "Only .png, .jpg files are allowed!" });
    });
  }
});

// READ
router.get("/:id", authenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const photos = await Photos.findAllByUser(id);

    if (photos) {
      res.status(200).json(photos);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE
router.put("/:id", authenticated, async (req, res) => {
  const { id } = req.params;
  const { photo_id, photo_title } = req.body;

  if (!photo_id && !title) {
    res
      .status(404)
      .json({ message: "Missing required fields photo_id, and title." });
  }

  try {
    const photo = await Photos.findById(photo_id);
    if (photo) {
      if (photo.user_id == id) {
        const result = await Photos.update(photo_id, {
          title: photo_title,
          url: photo.url,
          user_id: id
        });
        if (result > 0) {
          const p = await Photos.findById(photo.id);
          if (p) {
            res.status(200).json(p);
          }
        }
      } else {
        res
          .status(401)
          .json({ message: "You cannot edit a photo you did not share." });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE
router.delete("/:id", authenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const photo = await Photos.findById(id);
    if (photo) {
      const result = await Photos.remove(id);

      if (result > 0) {
        res
          .status(200)
          .json({ message: `Photo with id: ${id} has been removed.` });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
