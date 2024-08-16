class categoryRequest {
  body;
  file;
  authUser;
  constructor(req) {
    this.body = req.body;
    this.authUser = req.authUser;
    this.file = req.file;
  }
  transformCreateRequest = () => {
    let payload = this.body;
    if (!this.file) {
      throw { code: 401, message: "Category Image Required" };
    }
    payload.image = this.file.filename;
    let data = {
      title: payload.title,
      description: payload.title,
      image: payload.image,
      status: payload.status,
      createdBy: this.authUser._id,
    };
    console.log(data);
    return data;
  };

  transformUpdateRequest = () => {
    let payload = this.body;
    payload.createdBy = this.authUser._id;
    let data = {
      ...payload,
    };
    console.log(data);
    return data;
  };
}

module.exports = categoryRequest;
