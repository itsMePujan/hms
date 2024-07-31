const checkPermission = (role) => {
  return (req, res, next) => {
    try {
      //let allowedRole = role;
      let userRole = req.authUser;
      if (!userRole) {
        next({ code: 502, message: "Unauthorized Acess" });
      } else {
        if (userRole.role == role) {
          next();
        } else {
          next({ code: 502, message: "You Donot Have Permission" });
        }
      }
    } catch (error) {
      next(error);
    }
  };
};

module.exports = checkPermission;
