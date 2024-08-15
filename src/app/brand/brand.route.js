const brandCtrl = require("./brand.controller");

const router = require("express").Router();

const checkLogin = require("../../middlewares/auth.middleware");
const checkPermission = require("../../middlewares/rbac.middleware");
const validateRequest = require("../../middlewares/validate-request.middleware");
const { BrandCreateSchema } = require("./brand.validator");
const uploader = require("../../middlewares/uploader.middlerware");
//

const dirSetup = (req, res, next) => {
  req.uploadDir = "./public/uploads/brands";
  next();
};

//
router
  .route("/")
  .post(
    checkLogin,
    checkPermission("admin"),
    dirSetup,
    uploader.single("image"),
    validateRequest(BrandCreateSchema),
    brandCtrl.createBrand
  );
//

router
  .route("/:id")
  .get(brandCtrl.getDataById)
  .put(
    checkLogin,
    checkPermission("admin"),
    dirSetup,
    uploader.single("image"),
    brandCtrl.updateDataById
  )
  .delete(checkLogin, checkPermission("admin"), brandCtrl.deleteDataById);

module.exports = router;
