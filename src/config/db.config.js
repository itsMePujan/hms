require("dotenv").config();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_SERVER, {
    dbName: process.env.DB_NAME,
    autoCreate: true,
    autoIndex: true,
  })
  .then((success) => {
    console.log("Database Server Connected...");
  })
  .catch((exception) => {
    console.log("Error Establishing Database Connection . . .");
    process.exit(1);
  });
