const fs = require("fs");

class bannerRequest {
  transformCreateRequest = (request) => {
    let data = {
      ...request.body,
    };
    if (!request.file) {
      next({ code: 400, message: "image is required", result: null });
    } else {
      data.image = request.file.filename;
    }
    data.createdBy = request.authUser._id;
    return data;
  };

  transformUpdateRequest = (request) => {
    let data = {
      ...request.body,
    };
    if (request.file) {
      data.image = request.file.filename;
    }
    return data;
  };
}

const bannerReq = new bannerRequest();
module.exports = bannerReq;
