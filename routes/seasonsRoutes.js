//
const express = require("express");
const router = express.Router();
const playerSeason = require("./../models/playerSeason");
//
const f = (x) => {
  return parseFloat(x);
};
const i = (x) => {
  return parseInt(x);
};
const round2 = (x) => {
  var y = Math.round(f(x) * 100);
  return f(f(y) / 100);
};
//
router.get("/choose", (req, res) => {
  var maxSeason = 0;
  playerSeason.find({}, (err, docs) => {
    if (err) throw err;
    docs.forEach((doc) => {
      maxSeason = i(Math.max(i(maxSeason), i(doc.season)));
    });
    res.render("seasonList", { numSeasons: maxSeason });
  });
});
router.get("/:seasonNumber/sortby/:sorter", (req, res) => {
  const sorter = {};
  sorter[req.params.sorter] = "desc";
  playerSeason
    .find({ season: req.params.seasonNumber })
    .sort(sorter)
    .exec((err, docs) => {
      if (err) throw err;
      res.render("playersThisSeason", { players: docs });
    });
});
module.exports = router;
