const router = require("express").Router();

const authRoute = require("../app/auth/auth.router");

const BannerRoute = require("../app/banner/banner.route");

const BrandRoute = require("../app/brand/brand.route");

// authRoute
router.use("/auth", authRoute);

//BannerRoute
router.use("/banner", BannerRoute);

//BrandRoute
router.use("/brand", BrandRoute);

module.exports = router;
