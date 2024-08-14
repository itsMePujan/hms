//express
const express = require("express");
//router
const router = require("../router/index");
const { MulterError } = require("multer");
const { ZodError } = require("zod");

const { convertNullPrototypeObjects } = require("./helpers");
const app = express();

require("../config/db.config");

//json parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//api
app.use("/api/", router);

//404 handle
app.use((req, res, next) => {
  res.status(404).json({ result: null, message: "not found", meta: null });
});

//garbage / Error handling

app.use((error, req, res, next) => {
  console.log(error);
  let code = error.statusCode || 500;
  let message = error.message || "Internal Server Error";
  let result = error.result || null;

  // Multer file handling error
  if (error instanceof MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      code = 400;
      message = "File size limit exceeded";
    }
  }

  // Zod validation error formatting
  if (error instanceof ZodError) {
    code = 400;
    const zodError = error.errors;
    const msg = {};
    zodError.forEach((err) => {
      msg[err.path[0]] = err.message;
    });
    message = "Validation error";
    result = msg;
  }

  // MongoDB error handling
  if (error.code === 11000) {
    code = 400;
    let uniqueKeys = Object.keys(error.keyPattern);
    message = uniqueKeys.map((key) => `${key} should be unique`).join(", ");
    result = error.keyValue;
  }

  if (error.code === "TokenExpiredError") {
    code = 400;
    message = "Login Session Expired";
    result = error.name;
  }

  res.status(code).json({
    result: result,
    message: message,
    meta: null,
  });
});

module.exports = app;
