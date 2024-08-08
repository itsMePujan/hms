require("dotenv").config();
const jwt = require("jsonwebtoken");
const authSrv = require("../app/auth/auth.services");
const { getTokenFromHeader } = require("../config/helpers");

const checkLogin = async (req, res, next) => {
  let token = getTokenFromHeader(req);
  if (token == null) {
    next({ code: 401, message: "login required" });
  } else {
    token = token.split(" ").pop();
    if (!token) {
      next({ code: 401, message: "login required" });
    } else {
      let response = await authSrv.getPATByToken({ token });
      if (response) {
        let data = jwt.verify(token, process.env.JWT_SEC);

        let userDetail = await authSrv.getUserByFilter({ _id: data.userID });

        if (userDetail) {
          req.authUser = userDetail;
          next();
        } else {
          next({ code: 401, message: "Unauthorized Access" });
        }
      } else {
        next({ code: 401, message: "TOKEN INVALID OR EXPIRED" });
      }
    }
  }
};

module.exports = checkLogin;
