const blogCtrl = require("./blog.controller");

const router = require("express").Router();

router.route("/").get(blogCtrl.getallBlogData).post(blogCtrl.addBrandData);
module.exports = router;
