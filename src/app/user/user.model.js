const mongoose = require("mongoose");

//type : String , Number , Array, Object , ObjectId , Data
const UserSchemaDef = new mongoose.Schema(
  {
    name: { type: String, required: true, min: 2 },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
    image: { type: Object, default: null },
    address: {
      shipping: String,
      billing: String,
    },
    phone: String,
    role: { type: String, enum: ["user", "admin", "seller"], default: "user" },
    token: String,
    resetToken: String,
    resetExpiry: String,
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const UserModel = mongoose.model("User", UserSchemaDef);

module.exports = UserModel;
