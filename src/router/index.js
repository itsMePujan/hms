const router = require("express").Router();

const authRoute = require("../app/auth/auth.router");

const BannerRoute = require("../app/banner/banner.route");

const BrandRoute = require("../app/brand/brand.route");

const CategoryRoute = require("../app/category/category.route");
// authRoute
router.use("/auth", authRoute);

//BannerRoute
router.use("/banner", BannerRoute);

//BrandRoute
router.use("/brand", BrandRoute);

//CategoryRoute
router.use("/category", CategoryRoute);

module.exports = router;
