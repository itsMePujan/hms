const fs = require("fs");
const generateRandomString = (len = 100) => {
  let chars = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let length = chars.length;
  let random = "";

  for (let i = 1; i <= len; i++) {
    let posn = Math.ceil(Math.random() * (length - 1));
    random += chars[posn];
  }
  return random;
};

const getTokenFromHeader = (req) => {
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

  return token;
};

const deleteImageIFExist = (paths, image) => {
  let ImagePath = `./public/uploads/${paths}/${image}`;
  if (fs.existsSync(ImagePath)) {
    fs.unlinkSync(ImagePath, (error) => {
      if (error) {
        console.log("error deleting previous file");
        return;
      }
    });
  } else {
    throw { code: 401, message: "error Deleting image" };
  }
};

module.exports = {
  generateRandomString,
  getTokenFromHeader,
  deleteImageIFExist,
};
