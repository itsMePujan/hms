require("dotenv").config;
const { z } = require("zod");
const { generateRandomString } = require("../../config/helpers");
const mailSrv = require("../../services/mail.service");
const { registerEmailMessage } = require("./auth.services");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authSrv = require("./auth.services");

const authRequest = require("../auth/auth.request");

class authController {
  //register function
  register = async (req, res, next) => {
    try {
      //REQ DATA FROM TRANSFORMER
      let payload = new authRequest(req).transferRequestData();
      //DBS SAVED DATA
      let response = await authSrv.registerUser(payload);
      //SEND MAIL AFTER USER REGISTER
      const mailAck = await mailSrv.emailSend(
        payload.email,
        "Activate Your Account",
        registerEmailMessage(payload.name, payload.token)
      );
      res.json({
        result: payload,
        message: "success",
        meta: null,
      });
    } catch (except) {
      next(except);
    }
  };

  ///verify token TODo
  verifyToken = async (req, res, next) => {
    try {
      let token = req.params.token;
      //TODO : DBS
      let user = await authSrv.getUserByFilter({ token });
      if (user) {
        let updateStatus = await authSrv.updateByFilter(
          { token },
          {
            status: "active",
          }
        );
        res.json({
          result: updateStatus,
          message: "success",
          meta: null,
        });
      } else {
        res.json({
          result: user,
          message: "Failed to Verify Token OR Expired Token!!!",
          meta: null,
        });
      }
    } catch (excep) {
      next(excep);
    }
  };

  //set password
  async setPassword(req, res, next) {
    try {
      let token = req.params.token;
      let user = await authSrv.getUserByFilter({ token });
      if (user) {
        let encPass = bcryptjs.hashSync(req.body.password, 10);
        let updatePass = await authSrv.updateByFilter(
          { token },
          { password: encPass }
        );
      }
      res.json({
        result: user,
        message: "success",
        meta: null,
      });
    } catch (excep) {
      next(excep);
    }
  }

  //login
  async login(req, res, next) {
    try {
      let data = req.body;
      //UserDetail from DBS
      let userDetail = await authSrv.getUserByFilter({ email: data.email });
      if (userDetail) {
        if (bcryptjs.compareSync(data.password, userDetail.password)) {
          let token = jwt.sign(
            { userID: userDetail._id },
            process.env.JWT_SEC,
            {
              expiresIn: "1h",
            }
          );
          let refreshToken = jwt.sign(
            { userID: userDetail._id },
            process.env.JWT_SEC,
            {
              expiresIn: "2d",
            }
          );
          let PATDATA = {
            userId: userDetail._id,
            token: token,
            refreshToken: refreshToken,
          };

          let storePat = await authSrv.storePat(PATDATA);

          res.json({
            result: { token, refreshToken, type: "Bearer" },
            message: "success",
            meta: null,
          });
        } else {
          next({ code: 400, message: "User Credential didn't Matched ¡¡" });
        }
      } else {
        next({ code: 400, message: "User Credential didn't Matched ¡¡" });
      }
    } catch (error) {
      next(error);
    }
  }

  async checkLogin(req, res, next) {
    try {
      let user = req.authUser;
      res.json({
        result: user,
        message: "success",
        meta: null,
      });
    } catch (error) {
      next(error);
    }
  }

  async logoutUser(req, res, next) {
    try {
      let user = req.authUser;
      let logout = await authSrv.deletePatData({ userId: user._id });
      if (logout) {
        res.json({
          result: null,
          message: "Logout Successfully",
          meta: null,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

const authCtrll = new authController();
module.exports = authCtrll;
