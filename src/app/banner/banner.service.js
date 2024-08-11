const BannerModel = require("./banner.model");

class BannerService {
  bannerCreate = async (payload) => {
    try {
      const banner = new BannerModel(payload);
      const bc = banner.save();
    } catch (error) {
      throw error;
    }
  };
}

const bannerSvc = new BannerService();

module.exports = bannerSvc;
