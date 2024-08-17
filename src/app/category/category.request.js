var slugify = require("slugify");

class categoryRequest {
  body;
  file;
  authUser;
  slug;
  constructor(req) {
    this.body = req.body;
    this.slug = req.params.slug;
    this.authUser = req.authUser;
    this.file = req.file;
  }
  transformCreateRequest = () => {
    let payload = this.body;
    if (!this.file) {
      throw { code: 401, message: "Category Image Required" };
    }

    payload.image = this.file.filename;
    console.log(payload);
    let data = {
      title: payload.title,
      description: payload.title,
      image: payload.image,
      status: payload.status,
      slug: slugify(payload.title, { lower: true }),
      createdBy: this.authUser._id,
      parentId: payload.parentId,
    };
    console.log(data);
    return data;
  };

  transformUpdateRequest = () => {
    let payload = this.body;
    payload.createdBy = this.authUser._id;
    let data = {
      ...payload,
      slug: slugify(payload.title, { lower: true }),
    };
    console.log(data);
    return data;
  };
}

module.exports = categoryRequest;
