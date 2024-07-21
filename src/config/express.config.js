//express
const express = require("express");
//router
const router = require("../router/index");

const app = express();

//json
app.use(express.json());

//api
app.use("/api/", router);

app.use((req, res, next) => {
  res.status(404).json({ result: null, message: "not found", meta: null });
});

//garbage / Error handling

app.use((error, req, res, next) => {
  const code = error.code ?? 500;
  const message = error.message ?? "Internal server error";
  res.status(code).json({ result: null, message: message, meta: null });
});

module.exports = app;
