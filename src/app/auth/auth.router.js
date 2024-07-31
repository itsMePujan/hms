const router = require("express").Router();
const authCtrll = require("./auth.controller");
const uploader = require("../../middlewares/uploader.middlerware");
const validateRequest = require("../../middlewares/validate-request.middleware");
const {
  registerSchema,
  passwordSchema,
  loginSchema,
} = require("./auth.validator");

const checkLogin = require("../../middlewares/auth.middleware");

//auth and authorization routes
const dirSetup = (req, res, next) => {
  req.uploadDir = "./public/uploads/users";
  next();
};

router.post(
  "/register",
  dirSetup,
  uploader.array("image"),
  validateRequest(registerSchema),
  authCtrll.register
);

router.get("/verify-token/:token", authCtrll.verifyToken);

router.post(
  "/set-password/:token",
  validateRequest(passwordSchema),
  authCtrll.setPassword
);

router.post("/login", validateRequest(loginSchema), authCtrll.login);

router.get("/me", checkLogin, authCtrll.checkLogin);

router.post("/forgot-password");
router.post("/logout");

module.exports = router;
