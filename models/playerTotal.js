const mongoose = require("mongoose");
const playerTotalSchema = mongoose.Schema(
  {
    name: { type: String },
    initialAge: { type: Number },
    position: { type: String },
    seasons: { type: Array, default: [] },
    games: { type: Number, default: 0 },
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    contributions: { type: Number, default: 0 },
    goalsPerGame: { type: Number, default: 0 },
    contributionsPerGame: { type: Number, default: 0 },
    cleanSheets: { type: Number, default: 0 },
    hattricks: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    shirtNumber: { type: Array, default: [] },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);
const playerTotal = mongoose.model("playerTotal", playerTotalSchema);
module.exports = playerTotal;
