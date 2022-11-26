const express = require("express");
const { upload } = require("../helpers/img_upload");

const router = express.Router();
router.post("/user/upload", upload.single("profile"), (req, res) => {
res.status(200).json({
    status:"image uploaded successfully",
    profile_url:`http://localhost:${process.env.PORT}/profile/${req.file.filename}`
})
});

module.exports = router;
