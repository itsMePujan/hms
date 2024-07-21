//express
const express = require("express");
//router
const router = require("../router/index");
const { MulterError } = require("multer");

const app = express();

//json parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//api
app.use("/api/", router);

app.use((req, res, next) => {
  res.status(404).json({ result: null, message: "not found", meta: null });
});

//garbage / Error handling

app.use((error, req, res, next) => {
  const code = error.code ?? 500;
  const message = error.message ?? "Internal server error";

  if (error instanceof MulterError) {
    if (error.code == "LIMIT_FILE_SIZE") {
      code = 400;
      message = error.message;
    }
  }
  res.status(code).json({ result: null, message: message, meta: null });
});

module.exports = app;
