const multer = require("multer");

const AppError = require("../utils/AppError");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./images/drugs`);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `drug-${req.user._id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Please upload only images", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadDrugPhoto = upload.single("drugImage");
