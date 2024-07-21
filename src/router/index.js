const router = require("express").Router();

const authRoute = require("../app/auth/auth.router");

// route configure
router.use("/auth", authRoute);

module.exports = router;
