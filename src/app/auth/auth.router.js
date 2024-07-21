const router = require("express").Router();
const authCtrll = require("./auth.controller");
const uploader = require("../../middlewares/uploader.middlerware");

//auth and authorization routes
const dirSetup = (req, res, next) => {
  req.uploadDir = "./public/uploads/users";
  next();
};

router.post(
  "/register/",
  dirSetup,
  uploader.array("image"),
  authCtrll.register
);
router.get("/verify-token/:token");
router.post("set-password/:token");

router.post("login");

router.post("/forgot-password");
router.get("me");
router.post("/logout");

module.exports = router;
