const mongoose = require("mongoose");
const playerSeasonSchema = mongoose.Schema(
  {
    refId: { type: String },
    name: { type: String },
    season: { type: Number },
    games: { type: Number },
    goals: { type: Number },
    assists: { type: Number },
    contributions: { type: Number },
    goalsPerGame: { type: Number },
    contributionsPerGame: { type: Number },
    cleanSheets: { type: Number },
    hattricks: { type: Number },
    rating: { type: Number },
    shirtNumber: { type: Number },
  },
  { timestamps: true }
);
const playerSeason = mongoose.model("playerSeason", playerSeasonSchema);
module.exports = playerSeason;
