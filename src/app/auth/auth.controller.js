class authController {
  //register function
  register = (req, res, next) => {
    console.log("i m in auth controller");
  };
}

const authCtrll = new authController();
module.exports = authCtrll;
