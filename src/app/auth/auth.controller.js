class authController {
  //register function
  register = (req, res, next) => {
    res.json({
      result: null,
      message: "i m an auth controller",
      meta: null,
    });
  };

  ///
}

const authCtrll = new authController();
module.exports = authCtrll;
