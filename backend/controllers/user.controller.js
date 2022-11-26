const {
  createUser: create,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  findUserByEmail,
} = require("../model/user.model");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    console.log(body);
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          mesage: " database connection error",
        });
      }
      res.status(200).json({
        mesage: "Success",
        data: result,
      });
    });
  },
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    const check = Number(id);
    console.log(check);
    if (!check) {
      return res.status(400).json({ message: "Invalid request" });
    }
    getUserById(id, (err, result) => {
      if (err)
        res.status(500).json({
          message: "Server error",
          error: err,
        });
      if (!result)
        res.status(404).json({
          message: "No user with this credentials found",
        });
      return res.status(200).json({
        message: "Success",
        data: result,
      });
    });
  },
  getAllUsers: (req, res) => {
    getUsers((error, result) => {
      if (error) throw new Error(error);
      return res.status(200).json({
        mesage: "Success",
        data: result,
      });
    });
  },
  updateAUser: (req, res) => {
    const body = req.body;
    const password = body.password;
    if (password) {
      const salt = genSaltSync(10);
      body.password = hashSync(password, salt);
    }
    updateUser(body, (error, result) => {
      if (error)
        res.status(400).json({
          message: "An error occurred while updating the user",
          error,
        });
      return res.status(200).json({
        mesage: "User updated successfully",
      });
    });
  },
  deleteAUser: (req, res) => {
    const { id } = req.params;
    deleteUser(id, (error, result) => {
      if (error) {
        res.status(500).json({
          message: "There was an error deleting the user",
        });
      }
      return res.status(200).json({ message: "User deleted successfully" });
    });
  },
  login: (req, res) => {
    const body = req.body;
    // valide email
    findUserByEmail(body.email, (err, payload) => {
      // send the request using the email and returning the password as payload if user is found;
      if (err) {
        res.status(500).json({
          status: "failed",
          mesage: "Internal server error",
          error: err,
        });
      }
      if (!payload) {
        // if no payload then email is wrong;
        return res.status(400).json({
          status: "failed",
          mesage: "Invalid email or password",
        });
      }
      const found = compareSync(body.password, payload.password);
      if (!found) {
        // if not found then password is worng
        return res.status(400).json({
          status: "failed",
          mesage: "Invalid email or password",
        });
      }
      const token = sign({ id: payload.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRES_IN,
      });

      console.log(token);
      res.status(200).json({
        status: "logged in successfully",
        token,
      });
    });
  },
};
