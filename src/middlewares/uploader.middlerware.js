const multer = require("multer");
const fs = require("fs");
const myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = req.uploadDir ?? "./public/uploads";
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    cb(null, path);
  },
  filename: (req, file, cb) => {
    let random = Math.round(Math.random() * 9999);
    let ext = file.originalname.split(".").pop();
    let filename = Date.now() + "-" + random + "." + ext;
    cb(null, filename);
  },
});

const imageFilter = (req, file, cb) => {
  let ext = file.originalname.split(".").pop();
  let allowed = ["jpeg", "jpg", "png", "gif", "svg", "bmp", "webp"];
  if (allowed.includes(ext.toLowerCase())) {
    cb(null, true);
  } else {
    cb({ code: 400, message: "file format not supported" }, false);
  }
};

const uploader = multer({
  storage: myStorage,
  fileFilter: imageFilter,
  limit: { fileSize: 3 * 1024 * 1024 },
});

module.exports = uploader;
