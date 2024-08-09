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
const checkPermission = require("../../middlewares/rbac.middleware");

const dirSetup = (req, res, next) => {
  req.uploadDir = "./public/uploads/users";
  next();
};

//Register Route
router.post(
  "/register",
  dirSetup,
  uploader.array("image"),
  validateRequest(registerSchema),
  authCtrll.register
);

//Verify TOKEN // Verify EMAIL
router.get("/verify-token/:token", authCtrll.verifyToken);

//Set Password // reset pass
router.post(
  "/set-password/:token",
  validateRequest(passwordSchema),
  authCtrll.setPassword
);

//LOGIN THROUGH EMAIL AND PASS
router.post("/login", validateRequest(loginSchema), authCtrll.login);

//USER DASHBOARD
router.get("/me", checkLogin, checkPermission("user"), authCtrll.checkLogin);

router.get("/refresh-token", checkLogin, (req, res, next) => {});

// forgot-password->  // received email as body , send email with resetTOken with reset Expiry
router.post("/forgot-password", authCtrll.forgotPassword);
router.post(
  "/reset-password/:token",
  validateRequest(passwordSchema),
  authCtrll.resetPassword
);
router.post("/logout", checkLogin, authCtrll.logoutUser);

module.exports = router;
