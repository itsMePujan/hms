//express
const express = require("express");
//router
const router = require("../router/index");
const { MulterError } = require("multer");
const { ZodError } = require("zod");

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
  console.log("Garbage Collector : ", error);
  let code = error.code ?? 500;
  let message = error.message ?? "Internal server error";
  let result = error.result ?? null;

  // multer_error
  if (error instanceof MulterError) {
    if (error.code == "LIMIT_FILE_SIZE") {
      code = 400;
      message = error.message;
    }
  }

  // Zod_error
  if (error instanceof ZodError) {
    code = 400;
    let zodError = error.errors;
    let msg = {};
    zodError.map((err) => {
      msg[err.path[0]] = err.message;
    });
    message = "validation error";
    result = msg;
  }

  res.status(code).json({ result, message, meta: null });
});

module.exports = app;
