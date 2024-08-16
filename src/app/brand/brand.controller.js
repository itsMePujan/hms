const slugify = require("slugify");
const brandRequest = require("./brand.request");
const brandSrv = require("./brand.service");
const { deleteImageIFExist } = require("../../config/helpers");

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
        meta: null,
      });
    } catch (error) {
      next(error);
    }
  };
  //with pagination

  getDataById = async (req, res, next) => {
    try {
      let filter = {};
      if (req.query["search"]) {
        filter = {
          $or: [
            { title: new RegExp(req.query["search"], "i") },
            { url: new RegExp(req.query["search"], "i") },
            { status: new RegExp(req.query["search"], "i") },
            { slug: new RegExp(req.query["search"], "i") },
          ],
        };
      }
      let page = req.query["page"] || 1;
      let limit = req.query["limit"] || 15;

      let total = await brandSrv.countData(filter);

      let skip = (page - 1) * limit;

      let response = await brandSrv.listDataByFilter(filter, {
        offset: skip,
        limit: limit,
      });

      if (response) {
        res.json({
          result: response,
          message: "success",
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

  updateDataById = async (req, res, next) => {
    try {
      let data = new brandRequest(req).transformUpdateData();
      let id = req.params.id;
      let getData = await brandSrv.getDataById({ _id: id });
      // console.log(getData);
      if (getData) {
        let updateData = await brandSrv.updateDataById({ _id: id }, data);
        if (updateData) {
          if (data.image) {
            let currentImage = getData.image;
            deleteImageIFExist("brands", currentImage);
          }
        }
        res.json({
          result: updateData,
          message: "Brand Updated Successfully",
          meta: null,
        });
      }
    } catch (error) {
      next(error);
    }
  };
  deleteDataById = async (req, res, next) => {
    try {
      let id = req.params.id;

      let data = await brandSrv.getDataById({ _id: id });
      if (data) {
        let deleteData = await brandSrv.deleteDataById({ _id: id });
        if (deleteData) {
          let currentImage = data.image;
          deleteImageIFExist("brands", currentImage);

          res.json({
            result: deleteData,
            message: "Brand Deleted Successfully",
            meta: null,
          });
        }
      } else {
        next({ code: 401, message: "Brand Not Found" });
      }

      console.log(id);
    } catch (error) {
      next(error);
    }
  };
}

const brandCtrl = new BrandController();

module.exports = brandCtrl;
