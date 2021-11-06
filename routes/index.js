//
const express = require("express");
const router = express.Router();
const playerTotal = require("./../models/playerTotal");
//
var playerAdded = {
  status: false,
  name: null,
};
//
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
