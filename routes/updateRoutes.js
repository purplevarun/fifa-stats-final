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
      if (err) throw err;
      res.render("choosePlayerForUpdate", { players: doc });
    });
});
router.get("/:playerid", (req, res) => {
  const playerid = req.params.playerid;
  playerTotal.findById(playerid, (err, docs) => {
    if (err) throw err;
    res.render("updateThisPlayer", { data: docs });
  });
});
router.post("/:playerid", (req, res) => {
  const data = req.body;
  console.log(data);
  res.send("hi");
});
module.exports = router;
