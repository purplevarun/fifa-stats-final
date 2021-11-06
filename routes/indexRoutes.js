//
const express = require("express");
const router = express.Router();
const playerTotal = require("../models/playerTotal");
const playerSeason = require("../models/playerSeason");
//
var playerAdded = {
  status: false,
  name: null,
};
//
router.get("/seasonal/stats/:playerid/sortby/:sorter", (req, res) => {
  const sorter = {};
  sorter[req.params.sorter] = "desc";
  playerSeason
    .find({ refId: req.params.playerid })
    .sort(sorter)
    .exec((err, docs) => {
      res.render("seasonalStats", { docs: docs });
    });
});
router.get("/details/:playerid", (req, res) => {
  const playerid = req.params.playerid;
  playerTotal.findById(playerid, (err, docs) => {
    res.render("detailsOfThisPlayer", { player: docs });
  });
});
router.get("/players/sortby/:sorter", (req, res) => {
  const sorter = {};
  sorter[req.params.sorter] = "desc";
  playerTotal
    .find({})
    .sort(sorter)
    .exec((err, docs) => {
      res.render("listAllPlayers", { players: docs });
    });
});
router.get("/add", (req, res) => {
  res.render("addPlayer", { playerAdded: playerAdded });
  (playerAdded.name = null), (playerAdded.status = false);
  console.log("playeradded=", playerAdded);
});
router.post("/add/player", (req, res) => {
  const data = req.body;
  const newPlayer = new playerTotal({
    name: data.name,
    initialAge: data.age,
    position: data.pos,
  });
  newPlayer.save((err, doc) => {
    if (err) throw err;
    console.log(doc);
  });
  playerAdded.status = true;
  playerAdded.name = data.name;
  res.redirect("/add");
});
router.get("/", (req, res) => {
  res.render("homepage");
});
module.exports = router;
