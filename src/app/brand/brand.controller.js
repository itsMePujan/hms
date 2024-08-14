const brandRequest = require("./brand.request");
const brandSrv = require("./brand.service");

class BrandController {
  //CreateBrand
  createBrand = async (req, res, next) => {
    try {
      console.log(req.body);
      let data = new brandRequest(req).transformRequestData();

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

  getDataById = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}

const brandCtrl = new BrandController();

module.exports = brandCtrl;
