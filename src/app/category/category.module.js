const mongoose = require("mongoose");

const categorySchemaDef = mongoose.Schema(
  {
    title: { type: String, min: 2, require: true },
    description: { type: String, default: null },
    image: { type: String, default: null },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
      require: true,
    },
    slug: { type: String, require: true },
    parentId: { type: mongoose.Types.ObjectId, ref: "Category", default: null },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", require: true },
  },
  {
    autoIndex: true,
    autoCreated: true,
    timestamps: true,
  }
);

const categoryModel = mongoose.model("Category", categorySchemaDef);

module.exports = categoryModel;
