require("dotenv").config();

const app = require("./src/config/express.config");

const Port = process.env.PORT;

app.listen(Port, "localhost", () => {
  console.log("Server is Running on Port:" + Port);
});
