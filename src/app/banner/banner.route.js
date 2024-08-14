const router = require("express").Router();

const checkLogin = require("../../middlewares/auth.middleware");
const checkPermission = require("../../middlewares/rbac.middleware");
const uploader = require("../../middlewares/uploader.middlerware");
const validateRequest = require("../../middlewares/validate-request.middleware");
const { BannerCreateSchema } = require("./banner.validator");
const bannerCtrl = require("./banner.controller");

const dirSetup = (req, res, next) => {
  req.uploadDir = "./public/uploads/banners";
  next();
};

router
  .route("/")
  .get(checkLogin, checkPermission("admin"), bannerCtrl.listAllBanner)
  .post(
    checkLogin,
    checkPermission("admin"),
    dirSetup,
    uploader.single("image"),
    validateRequest(BannerCreateSchema),
    bannerCtrl.bannerCreate
  );

router
  .route("/:id")
  .get(bannerCtrl.getDataById)
  .put(
    checkLogin,
    checkPermission("admin"),
    dirSetup,
    uploader.single("image"),
    validateRequest(BannerCreateSchema),
    bannerCtrl.updateById
  )
  .delete(checkLogin, checkPermission("admin"), bannerCtrl.deleteBanner);

module.exports = router;
