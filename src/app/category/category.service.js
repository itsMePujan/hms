const categoryModel = require("./category.module");

class CategoryService {
  createData = async (data) => {
    try {
      let category = new categoryModel(data);
      let save = await category.save();
      if (save) {
        return save;
      } else {
        throw { code: 401, message: "Error Saving Data" };
      }
    } catch (error) {
      throw error;
    }
  };

  fetchDataById = async (id) => {
    try {
      let data = await categoryModel.findOne(id);
      if (data) {
        return data;
      } else {
        throw { code: 401, message: "Category Does'nt Exist" };
      }
    } catch (error) {
      throw error;
    }
  };
  updateDataById = async (data) => {
    try {
      let update = await categoryModel.updateOne(data);
      if (update) {
        return update;
      } else {
        throw { code: 401, message: "Error Updating Data" };
      }
    } catch (error) {
      throw error;
    }
  };

  deleteDataById = async (id) => {
    try {
      let deleteData = categoryModel.deleteOne(id);
      if (deleteData) {
        return deleteData;
      } else {
        throw {
          code: 401,
          message: "Category Already Deleted or Unable To Delete Try Again",
        };
      }
    } catch (error) {
      throw error;
    }
  };
  countData = async (filter) => {
    try {
      let totalData = categoryModel.countDocuments(filter);
      if (totalData) {
        return totalData;
      } else {
        throw { code: 401, message: "Unable To FetchData" };
      }
    } catch (error) {
      throw error;
    }
  };

  fetchDataByFilter = async (
    filter = {},
    paging = { offset: 1, limit: 15 }
  ) => {
    try {
      let fetchByFilter = await categoryModel
        .find(filter)
        .populate("parentId", ["_id", "title", "status", "image"])
        .populate("createdBy", ["_id", "name", "status"])
        .sort({ _id: 1 })
        .skip(paging.offset)
        .limit(paging.limit);

      if (fetchByFilter) {
        return fetchByFilter;
      } else {
        throw { code: 401, message: "Failed To Retrieve Data" };
      }
    } catch (error) {
      throw error;
    }
  };
}

const categorySrv = new CategoryService();
module.exports = categorySrv;
