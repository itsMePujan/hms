const UserModel = require("../user/user.model");
const PATModel = require("./personal-access-token.model");

class authService {
  registerEmailMessage(name, token) {
    return `<p> Dear ${name}<br><br>
        your account has been registered successfully , 
        click the link to activate your
        account <a href="${process.env.HOST}/auth/verify-token/${token}" > 
        ${process.env.HOST}/auth/verify-token/${token}</a><br><br>
        <p>
          <br>regards<br>
          <br>don't reply this Message<br>
        </p>`;
  }
  ResetPasswordMessage(name, token) {
    return `
          <br>
          Dear ${name}, <br>
          <p>YOUR Reset LINK SUCCESSFULLY GENERATED.</p>
          <p>Click the button below to RESET your account:</p>
          <a href="${process.env.HOST}auth/reset-password/${token}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #007BFF; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <br><br>
          <p>Or use the following link:</p>
          <a href="${process.env.HOST}auth/reset-password/${token}">${process.env.HOST}auth/reset-password/${token}</a>
          <p>Link Expires on 2hr:</p>
        `;
  }
  registerUser = async (payload) => {
    try {
      let user = new UserModel(payload);
      let response = await user.save();
      return response;
    } catch (error) {
      throw error;
    }
  };

  getUserByFilter = async (filter) => {
    //  console.log(filter);
    try {
      let user = await UserModel.findOne(filter);
      return user;
    } catch (error) {
      throw error;
    }
  };

  updateByFilter = async (filter, payload) => {
    console.log(filter, payload);
    try {
      let response = await UserModel.updateOne(filter, { $set: payload });
      return response;
    } catch (error) {
      throw error;
    }
  };

  storePat = async (payload) => {
    try {
      let patObj = new PATModel(payload);
      return patObj.save();
    } catch (error) {
      throw error;
    }
  };

  getPATByToken = async (token) => {
    try {
      let response = await PATModel.findOne(token);
      return response;
    } catch (error) {
      throw error;
    }
  };

  deletePatData = async (filter) => {
    try {
      let response = await PATModel.deleteMany(filter);
      if (response) {
        return response;
      } else {
        throw { code: 401, message: "ToKen invalid!!" };
      }
    } catch (error) {
      throw error;
    }
  };

  setResetToken = async (filter, payload) => {
    console.log(filter, payload);
    try {
      let response = await UserModel.updateMany(filter, { $set: payload });
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const authSrv = new authService();
module.exports = authSrv;
