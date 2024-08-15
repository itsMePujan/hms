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

  //with pagination
  listDataByFilter = async (filter = {}, paging = { offset: 0, limit: 15 }) => {
    try {
      let data = await brandModel
        .find(filter)
        .populate("createdBy", ["_id", "name"])
        .sort({ _id: 1 })
        .skip(paging.offset)
        .limit(paging.limit);

      if (data) {
        return data;
      } else {
        throw { code: 401, message: "Error Retrieving Data" };
      }
    } catch (error) {
      throw error;
    }
  };
  //countData
  countData = async (filter = {}) => {
    try {
      const list = await brandModel.countDocuments(filter);
      return list;
    } catch (error) {
      throw error;
    }
  };

  getDataById = async (filter) => {
    try {
      const dataById = await brandModel
        .findOne(filter)
        .populate("createdBy", ["_id", "name"]);
      if (dataById) {
        return dataById;
      } else {
        throw { code: 401, message: "Banner Not Found" };
      }
    } catch (error) {
      throw error;
    }
  };
  //updateDataById
  updateDataById = async (filter, payload) => {
    try {
      let updateData = await brandModel.updateOne(filter, { $set: payload });
      if (updateData) {
        return updateData;
      } else {
        throw { code: 401, message: "Error  Updating Brand" };
      }
    } catch (error) {
      throw error;
    }
  };

  //
  deleteDataById = async (id) => {
    try {
      let deleteData = brandModel.deleteOne(id);
      if (deleteData) {
        return deleteData;
      } else {
        throw { code: 401, message: "Unable To Delete Data" };
      }
    } catch (error) {
      throw error;
    }
  };
}

const brandSrv = new BrandService();
module.exports = brandSrv;
