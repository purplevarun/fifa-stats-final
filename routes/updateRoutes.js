//
const express = require("express");
const router = express.Router();
const playerTotal = require("../models/playerTotal");
const playerSeason = require("../models/playerSeason");
//
router.get("/choose", (req, res) => {
  res.render("choosePlayerForUpdate");
});
module.exports = router;
