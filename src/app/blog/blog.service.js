const blogModel = require("./blog.model");

class BlogService {
  CreateBrandData = (data) => {
    try {
      let blog = new blogModel(data);
      let response = blog.save();
      if (response) {
        return response;
      } else {
        throw { code: 401, message: "Error Saving BLog Data" };
      }
    } catch (error) {
      throw error;
    }
  };
}

const blogSrv = new BlogService();
module.exports = blogSrv;
