const BannerModel = require("./banner.model");

class BannerService {
  bannerCreate = async (payload) => {
    try {
      const banner = new BannerModel(payload);
      const bs = await banner.save();
      return bs;
    } catch (error) {
      throw error;
    }
  };

  listAllData = async (filter = {}, paging = { offset: 0, limit: 15 }) => {
    try {
      const banner = await BannerModel.find(filter)
        .populate("createdBy", ["_id", "name"])
        .sort({ _id: 1 })
        .skip(paging.offset)
        .limit(paging.limit);
      return banner;
    } catch (error) {
      throw error;
    }
  };

  countData = async (filter = {}) => {
    try {
      const list = await BannerModel.countDocuments(filter);
      return list;
    } catch (error) {
      throw error;
    }
  };
}

const bannerSvc = new BannerService();

module.exports = bannerSvc;
