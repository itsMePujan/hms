const mongoose = require("mongoose");

const PATSchemaDef = mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    refreshToken: { type: String, required: true },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const PATModel = mongoose.model("pat", PATSchemaDef);

module.exports = PATModel;
