const categoryModel = require("./category.module");

class CategoryService {
  createData = async (data) => {
    let category = new categoryModel(data);
    let save = await category.save();
    if (save) {
      return save;
    } else {
      throw { code: 401, message: "Error Saving Data" };
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
}

const categorySrv = new CategoryService();
module.exports = categorySrv;
