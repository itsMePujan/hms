const router = require("express").Router();

const authRoute = require("../app/auth/auth.router");

const BannerRoute = require("../app/banner/banner.route");

// authRoute
router.use("/auth", authRoute);

//BannerRoute
router.use("/banner", BannerRoute);

module.exports = router;
