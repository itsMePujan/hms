const brandSrv = require("./brand.service");

class BrandController {
  //CreateBrand
  createBrand = async (req, res, next) => {
    try {
      console.log(req.body);
      let data = {
        title: req.body.title,
        image: req.file.filename,
        description: req.body.description,
        status: req.body.status,
      };
      console.log(data);
      let response = await brandSrv.createData(data);
      res.json({
        result: response,
        message: "Brand Created Successfully",
        result: null,
      });
    } catch (error) {
      next(error);
    }
  };
}

const brandCtrl = new BrandController();

module.exports = brandCtrl;
