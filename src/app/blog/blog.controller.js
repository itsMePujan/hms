class blogController {
  addBrandData = async (req, res, next) => {
    try {
      let data = req.body;
      let response = blogSrv.addBrandData(data);
      res.json({ result: response, message: "Successfully  Added Blog" });
    } catch (error) {
      next(error);
    }
  };

  getallBlogData = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}

const blogCtrl = new blogController();
module.exports = blogCtrl;
