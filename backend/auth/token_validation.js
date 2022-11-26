const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (!token) {
      return res.status(401).json({
        status: "Unauthorized",
        message: "Access denied!",
      });
    }
    token = token.slice(7);
    verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        res.status(401).json({
          status: "failed",
          message: "Invalid token",
        });
      }
      next();
    });
  },
};
