//
const express = require("express");
const router = express.Router();
const playerTotal = require("../models/playerTotal");
const playerSeason = require("../models/playerSeason");
//
router.get("/choose/sortby/:sorter", (req, res) => {
  const sorter = {};
  sorter[req.params.sorter] = "desc";
  playerTotal
    .find({})
    .sort(sorter)
    .exec((err, doc) => {
      res.render("choosePlayerForUpdate", { players: doc });
    });
});
module.exports = router;
