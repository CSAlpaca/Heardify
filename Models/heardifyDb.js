var mongoose = require("mongoose");

const heardifyDbSchema = new mongoose.Schema(
  {
    text: String,
  },
  {
    timestamps: true,
  }
);

heardifyDb = mongoose.model("heardifyDb", heardifyDbSchema);
module.exports = heardifyDb;
