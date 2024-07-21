class authController {
  //register function
  register = (req, res, next) => {
    try {
      let payload = req.body;

      if (req.file) {
        payload.image = req.file.filename;
      } else if (req.files) {
        payload.image = req.files.map((item) => item.filename);
      }

      res.json({
        result: payload,
        //file: file,
        message: "success",
        meta: null,
      });
    } catch (except) {
      next(except);
    }
  };

  ///
}

const authCtrll = new authController();
module.exports = authCtrll;
