class brandRequest {
  body;
  file;
  authUser;

  constructor(req) {
    this.body = req.body;
    this.authUser = req.authUser;
    this.file = req.file;
  }

  transformRequestData = () => {
    let payload = this.body;

    if (!this.file) {
      throw { code: 401, message: "Image is required" };
    } else {
      payload.image = this.file.filename;
    }
    payload.createdBy = this.authUser;

    return payload;
  };

  transformUpdateData = () => {
    let payload = this.body;
    if (this.file) {
      payload.image = this.file.filename;
    }
    return payload;
  };
}

module.exports = brandRequest;
