const router = require("express").Router();

router.get("/a/", (req, res, next) => {
  res.json({
    result: null,
    message: "imrouter",
    meta: null,
  });
});

module.exports = router;
