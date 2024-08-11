const bannerRequest = require("./banner.request");
const bannerSvc = require("./banner.service");

class BannerController {
  bannerCreate = (req, res, next) => {
    try {
      const payload = bannerReq.transformCreateRequest(req);
      const response = bannerSvc.bannerCreate();
    } catch (error) {
      next(error);
    }
  };
}

const bannerCtrl = new BannerController();
module.exports = bannerCtrl;
