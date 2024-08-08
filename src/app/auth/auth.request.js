const { generateRandomString } = require("../../config/helpers");

class authRequest {
  body;
  file;
  files;
  constructor(req) {
    this.body = req.body;
    this.file = req.file;
    this.files = req.files;
  }

  transferRequestData = () => {
    let payload = this.body;
    if (this.file) {
      payload.image = this.file.filename;
    } else if (this.files) {
      payload.image = this.files.map((item) => item.filename);
    }
    //TODO : DB STORE
    payload.status = "inactive";
    payload.token = generateRandomString();

    return payload;
  };
}

module.exports = authRequest;
