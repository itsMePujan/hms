const mongoose = require("mongoose");

const BannerSchemaDef = new mongoose.Schema(
  {
    title: { type: String, require: true, min: 3 },
    image: { type: String, require: true },
    url: { type: String, require: false },
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: true,
      default: null,
    },
  },

  { timestamps: true, autoCreate: true, autoIndex: true }
);

const BannerModel = mongoose.model("Banner", BannerSchemaDef);

module.exports = BannerModel;
