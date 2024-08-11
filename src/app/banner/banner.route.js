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
  .post(
    checkLogin,
    checkPermission("admin"),
    dirSetup,
    uploader.single("image"),
    validateRequest(BannerCreateSchema),
    bannerCtrl.bannerCreate
  );

module.exports = router;
