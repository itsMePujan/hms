const router = require("express").Router();
const authCtrll = require("./auth.controller");

//auth and authorization routes

router.post("/register/", authCtrll.register);
router.get("/verify-token/:token");
router.post("set-password/:token");

router.post("login");

router.post("/forgot-password");
router.get("me");
router.post("/logout");

module.exports = router;
