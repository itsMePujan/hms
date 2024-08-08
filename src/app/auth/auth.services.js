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
      throw erro;
    }
  };

  updateByFilter = async (filter, payload) => {
    // console.log(filter, payload);
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
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const authSrv = new authService();
module.exports = authSrv;
