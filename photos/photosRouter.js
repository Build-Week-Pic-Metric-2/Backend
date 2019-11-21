const router = require("express").Router();
const authenticated = require("../middleware/authenticated");
const Photos = require("./photos-model");
const multer = require("multer");

const fs = require("fs");

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

// Open mic and talk O_O
const upload = multer({ storage: storage });

router.post("/test/", upload.single("file"), (req, res, next) => {
  console.log(req.file);
  res.status(200).json({ message: "Works.." });
  fs.unlink(`./uploads/${req.file.originalname}`, err => {
    if (err) throw err;

    console.log("Disposed of file, to keep storage down.");
  });
});

// const upload = require("../api/services/file-uploader");
// const singleImageUpload = upload.single("image");

// router.post("/image-upload", async (req, res) => {
//   singleImageUpload(req, res, error => {
//     return res.json({ imageUrl: req.file.location });
//   });
// });

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
