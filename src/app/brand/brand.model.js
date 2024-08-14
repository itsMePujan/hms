const mongoose = require("mongoose");

const BrandSchemaDef = mongoose.Schema(
  {
    title: { type: String, require: true, min: 2, unique: true },
    image: { type: String, require: true },
    description: String,
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
);

const brandModel = mongoose.model("brand", BrandSchemaDef);

module.exports = brandModel;
