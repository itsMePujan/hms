require("dotenv").config;
const { z } = require("zod");
const { generateRandomString } = require("../../config/helpers");
const mailSrv = require("../../services/mail.service");
const { registerEmailMessage } = require("./auth.services");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

class authController {
  //register function
  register = async (req, res, next) => {
    try {
      let payload = req.body;

      if (req.file) {
        payload.image = req.file.filename;
      } else if (req.files) {
        payload.image = req.files.map((item) => item.filename);
      }
      //TODO : DB STORE
      payload.status = "inactive";
      payload.token = generateRandomString();

      // MAIL : SEND MAIL
      const mailAck = await mailSrv.emailSend(
        payload.email,
        "Activate Your Account",
        registerEmailMessage(payload.name, payload.token)
      );

      console.log(mailAck);

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
  verifyToken = (req, res, next) => {
    try {
      let token = req.params.token;
      //TODO : DBS
      res.json({
        result: token,
        message: "success",
        meta: null,
      });
    } catch (excep) {
      next(excep);
    }
  };

  //set password
  async setPassword(req, res, next) {
    try {
      let token = req.params.token;
      let encPass = bcryptjs.hashSync(req.body.password, 10);
      console.log(token);
      res.json({
        result: { token, encPass },
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
      //TODO : userDetail came from dbs
      let userDetail = {
        _id: 1234,
        name: "pujan poudel ",
        email: "pujan@admin.com",
        role: "users",
        image: [],
        status: "inactive",
      };

      if (bcryptjs.compareSync(data.password, userDetail.password)) {
        let token = jwt.sign({ userID: userDetail._id }, process.env.JWT_SEC, {
          expiresIn: "1h",
        });
        let refreshToken = jwt.sign(
          { userID: userDetail._id },
          process.env.JWT_SEC,
          {
            expiresIn: "2d",
          }
        );
        res.json({
          result: { token, refreshToken, type: "Bearer" },
          message: "sucess",
          meta: null,
        });
      } else {
        next({ code: 400, message: "User Credential Didnt Matched ¡¡" });
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
}

const authCtrll = new authController();
module.exports = authCtrll;
