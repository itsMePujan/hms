const checkLogin = require("../../middlewares/auth.middleware");
const checkPermission = require("../../middlewares/rbac.middleware");
const validateRequest = require("../../middlewares/validate-request.middleware");

const { categoryCreateSchema } = require("./category.validator");

const categoryCtrl = require("./category.controller");
const uploader = require("../../middlewares/uploader.middlerware");
const router = require("express").Router();

const dirSetup = (req, res, next) => {
  req.uploadDir = "./public/uploads/category/";
  next();
};
//createCategory // add done
router
  .route("/")
  .post(
    checkLogin,
    checkPermission("admin"),
    dirSetup,
    uploader.single("image"),
    validateRequest(categoryCreateSchema),
    categoryCtrl.createData
  );

router
  .route("/:id")
  .put(
    checkLogin,
    checkPermission("admin"),
    dirSetup,
    uploader.single("image"),
    categoryCtrl.updateDataById
  )
  .delete(checkLogin, checkPermission("admin"), categoryCtrl.deleteDataById);
module.exports = router;
