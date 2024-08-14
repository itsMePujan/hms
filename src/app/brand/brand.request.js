class brandRequest {
  body;
  file;

  constructor(req) {
    this.body = req.body;
    this.file = req.file;
    if (!this.file) {
      throw { code: 401, message: "Image is required" };
    }
  }

  transformRequestData = () => {
    let payload = this.body;

    payload.image = this.file.filename;

    return payload;
  };
}

module.exports = brandRequest;
