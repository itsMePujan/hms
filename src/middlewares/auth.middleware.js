require("dotenv").config();
const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  let token = null;

  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
  }
  if (req.headers["x-xsrf-token"]) {
    token = req.headers["x-xsrf-token"];
  }
  if (req.query["token"]) {
    token = req.query["token"];
  }

  if (token == null) {
    next({ code: 401, message: "login required" });
  } else {
    token = token.split(" ").pop();
    if (!token) {
      next({ code: 401, message: "login required" });
    } else {
      let data = jwt.verify(token, process.env.JWT_SEC);
      let userDetail = {
        _id: 1234,
        name: "pujan poudel ",
        email: "pujan@admin.com",
        role: "user",
        image: [],
        status: "inactive",
      };

      if (userDetail) {
        req.authUser = userDetail;
        next();
      } else {
        next({ code: 401, message: "Unauthorized Access" });
      }
    }
  }
};

module.exports = checkLogin;
