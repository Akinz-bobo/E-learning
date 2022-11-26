const express = require("express");
const { upload } = require("../helpers/img_upload");
const {
  createUser,
  getAllUsers,
  deleteAUser,
  updateAUser,
  getUserByUserId,
  login,
} = require("../controllers/user.controller");
const { checkToken } = require("../auth/token_validation");
const router = express.Router();

router.post("/user/register", checkToken, upload.single("profile"), createUser);
router.get("/user/all", checkToken, getAllUsers);
router.delete("/user/delete/:id", checkToken, deleteAUser);
router.patch("/user/update", checkToken, updateAUser);
router.get("/user/:id", checkToken, getUserByUserId);
router.post("/user/login", login);
module.exports = router;
