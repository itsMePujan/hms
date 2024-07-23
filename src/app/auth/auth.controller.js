const { z } = require("zod");

class authController {
  //register function
  register = (req, res, next) => {
    try {
      let payload = req.body;

      const register = z.object({
        name: z.string().min(2).max(40),
        email: z.string().email(),
        role: z
          .string()
          .regex(/admin|user|hosteler/)
          .default("user"),
      });
      let validatedData = register.parse(payload);

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
