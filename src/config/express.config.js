//express
const express = require("express");
//router
const router = require("../router/index");

const app = express();

//api
app.use("/api/", router);

app.use((req, res, next) => {
  res.status(404).json({ result: null, message: "not found", meta: null });
});

module.exports = app;
