require("dotenv").config;
const { z } = require("zod");
const { generateRandomString } = require("../../config/helpers");
const mailSrv = require("../../services/mail.service");
const { registerEmailMessage } = require("./auth.services");
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
      console.log(token);
      res.json({
        result: token,
        message: "success",
        meta: null,
      });
    } catch (excep) {
      next(excep);
    }
  }
}

const authCtrll = new authController();
module.exports = authCtrll;
