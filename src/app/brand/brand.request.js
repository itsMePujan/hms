const { default: slugify } = require("slugify");

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
    payload.slug = slugify(payload.title);

    return payload;
  };

  transformUpdateData = () => {
    let payload = this.body;
    if (this.file) {
      payload.image = this.file.filename;
    }
    payload.slug = slugify(payload.title);

    return payload;
  };
}

module.exports = brandRequest;
