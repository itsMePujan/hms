const categoryRequest = require("./category.request");
const categorySrv = require("./category.service");
const { deleteImageIFExist } = require("../../config/helpers");

class CategoryController {
  //categorySave
  createData = async (req, res, next) => {
    try {
      let data = new categoryRequest(req).transformCreateRequest();
      //console.log(data);
      let response = await categorySrv.createData(data);
      res.json({
        result: response,
        message: "Category Added Successfully",
        meta: null,
      });
    } catch (error) {
      next(error);
    }
  };

  //categoryUpdateById
  updateDataById = async (req, res, next) => {
    try {
      let id = req.params.id;
      //onsole.log(id);
      let idData = await categorySrv.fetchDataById({ _id: id });
      // console.log(idData);
      if (idData) {
        let data = new categoryRequest(req).transformUpdateRequest();
        let updateData = await categorySrv.updateDataById(data);
        if (updateData) {
          if (data.image) {
            deleteImageIFExist("category", data.image);
          }
          res.json({
            result: updateData,
            message: "Category Successfully Updated",
            meta: null,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  };

  deleteDataById = async (req, res, next) => {
    try {
      let id = req.params.id;
      let idData = await categorySrv.fetchDataById({ _id: id });
      if (idData) {
        let deleteData = await categorySrv.deleteDataById({ _id: id });
        if (deleteData) {
          if (idData.image) {
            deleteImageIFExist("category", idData.image);
          }
          res.json({
            result: deleteData,
            message: "Category Deleted SuccessFully",
            meta: null,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  };

  getDataById = async (req, res, next) => {
    try {
      let filter = {};
      filter = {
        $or: [
          { title: new RegExp(req.query["search"], "i") },
          { status: new RegExp(req.query["search"], "i") },
          { description: new RegExp(req.query["search"], "i") },
        ],
      };
      //
      let totalCount = await categorySrv.countData(filter);
      let page = req.query["page"] || 1;
      let limit = req.query["limit"] || 15;
      let skip = (page - 1) * limit;
      let fetchDataByFilter = await categorySrv.fetchDataByFilter(filter, {
        offset: skip,
        limit: limit,
      });
      res.json({
        result: fetchDataByFilter,
        message: "Successfully Fetched Data",
        meta: {
          totalPage: totalCount,
          page: page,
          limit: limit,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}

const categoryCtrl = new CategoryController();
module.exports = categoryCtrl;
