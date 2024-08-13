const { response } = require("express");
const bannerReq = require("./banner.request");
const bannerSvc = require("./banner.service");

const fs = require("fs");

class BannerController {
  bannerCreate = async (req, res, next) => {
    try {
      const payload = bannerReq.transformCreateRequest(req);
      const response = await bannerSvc.bannerCreate(payload);
      if (response) {
        res.json({
          result: payload,
          message: "success",
          meta: null,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  //list banners with pagination
  listAllBanner = async (req, res, next) => {
    try {
      let filter = {};

      if (req.query["search"]) {
        filter = {
          //title , url , status
          $or: [
            { title: new RegExp(req.query["search"], "i") },
            { url: new RegExp(req.query["search"], "i") },
            { status: new RegExp(req.query["search"], "i") },
          ],
        };
      }
      //added by loggedIn user
      filter = {
        $and: [{ createdBy: req.authUser._id }, { ...filter }],
      };

      let page = req.query["page"] || 1;
      let limit = req.query["limit"] || 15;

      let total = await bannerSvc.countData(filter);

      let skip = (page - 1) * limit;

      const response = await bannerSvc.listAllData(filter, {
        offset: skip,
        limit: limit,
      });
      if (response) {
        res.json({
          result: response,
          message: "Banner fetched Successfully",
          meta: {
            total: total,
            currentPage: page,
            limit: limit,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  };

  getDataById = async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await bannerSvc.getDataById({ _id: id });
      if (response) {
        res.json({
          result: response,
          message: "success",
          meta: null,
        });
      }
    } catch (error) {
      next(error);
    }
  };
  updateById = async (req, res, next) => {
    try {
      let id = req.params.id;
      let currentData = await bannerSvc.getDataById({ _id: id });
      if (currentData) {
        let currentImageName = currentData.image;
        let data = bannerReq.transformUpdateRequest(req);
        let response = await bannerSvc.updateById({ _id: id }, data);
        if (response) {
          if (data.image) {
            let ImagePath = `./public/uploads/banners/${currentImageName}`;
            fs.unlinkSync(ImagePath, (error) => {
              if (error) {
                console.log("error deleting previous file");
                return;
              }
            });
          }
          res.json({
            result: response,
            message: "Banner Updated Successful",
            meta: null,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  };
}

const bannerCtrl = new BannerController();
module.exports = bannerCtrl;
