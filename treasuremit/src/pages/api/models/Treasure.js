import mongoose from "mongoose";

const TreasureSchema = new mongoose.Schema({
  clue: String,
  long: Number,
  lat: Number,
  uuid: String,
  treasure: Object,
  placed_by: Object,
  placed_at: String,
});

module.exports =
  mongoose.models.Treasure || mongoose.model("Treasure", TreasureSchema);
