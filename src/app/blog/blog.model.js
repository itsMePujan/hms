const mongoose = require("mongoose");

const blogSchemaDef = mongoose.Schema(
  {
    title: { type: String, require: true, min: 2 },
    image: {
      type: String,
      require: true,
    },
    description: String,
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const blogModel = mongoose.model("blog", blogSchemaDef);

module.exports = blogModel;
