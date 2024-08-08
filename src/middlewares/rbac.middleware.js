const checkPermission = (role) => {
  return (req, res, next) => {
    try {
      let userRole = req.authUser;
      if (!userRole) {
        next({ code: 502, message: "Unauthorized Access" });
      } else {
        if (userRole.role == role) {
          next();
        } else {
          next({ code: 502, message: "You don't Have Permission" });
        }
      }
    } catch (error) {
      next(error);
    }
  };
};

module.exports = checkPermission;
