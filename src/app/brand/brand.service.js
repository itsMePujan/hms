const brandModel = require("./brand.model");

class BrandService {
  //crate or save
  createData = async (data) => {
    try {
      const brand = new brandModel(data);
      const response = await brand.save();
      if (response) {
        return response;
      } else {
        throw { code: 401, message: "Error Creating Brand" };
      }
    } catch (error) {
      throw error;
    }
  };
}

const brandSrv = new BrandService();
module.exports = brandSrv;
