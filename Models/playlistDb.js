var mongoose = require("mongoose");

const songDbSchema = new mongoose.Schema({
  trackName: { type: String },
  artist: { type: String },
  albumCover: { type: String },
});

songsDb = mongoose.model("songsDb", songDbSchema);
module.exports = songsDb;
