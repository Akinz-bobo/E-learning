const multer = require("multer");
const path = require("path");
const { randomBytes } = require("crypto");

const buff = randomBytes(10).toString("hex");
// console.log(buff);

// storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${buff}${path.extname(file.originalname)}`
    );
  },
});

module.exports = {
  upload: multer({
    storage,
    limits: {
      fileSize: 20,
    },
  }),
};
