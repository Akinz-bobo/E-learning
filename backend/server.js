require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/profile", express.static("upload/images"));
const PORT = process.env.PORT || 8000;

// Global error haldler
function errHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  } else if (err) {
    return res.status(400).json({
      status: "failed",
      message: "An error occurred while uploading the file",
    });
  }
  next(err);
}

//routes
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require("./routes/" + r))
);
app.use(errHandler);
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
