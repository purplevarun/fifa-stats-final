//
const express = require("express");
const router = express.Router();
const playerTotal = require("../models/playerTotal");
const playerSeason = require("../models/playerSeason");
//
var playerUpdated = {
  status: false,
  name: null,
};
router.get("/choose/sortby/:sorter", (req, res) => {
  const sorter = {};
  sorter[req.params.sorter] = "desc";
  playerTotal
    .find({})
    .sort(sorter)
    .exec((err, doc) => {
      if (err) throw err;
      res.render("choosePlayerForUpdate", {
        players: doc,
        playerUpdated: playerUpdated,
      });
      (playerUpdated.status = false), (playerUpdated.name = null);
    });
});
router.get("/:playerid", (req, res) => {
  const playerid = req.params.playerid;
  playerTotal.findById(playerid, (err, docs) => {
    if (err) throw err;
    res.render("updateThisPlayer", { data: docs });
  });
});
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
router.post("/:playername/:playerid", (req, res) => {
  const data = req.body;
  const newplayerseason = new playerSeason({
    refId: req.params.playerid,
    name: req.params.playername,
    games: i(data.games),
    goals: i(data.goals),
    assists: i(data.assists),
    season: i(data.season),
    shirtNumber: i(data.shirtNumber),
    rating: f(data.rating),
    cleanSheets: i(data.cleanSheets),
    hattricks: i(data.hattricks),
    contributions: i(i(data.goals) + i(data.assists)),
    goalsPerGame: round2(f(data.goals) / f(data.games)),
    contributionsPerGame: round2(
      f(f(data.goals) + f(data.assists)) / f(data.games)
    ),
  });
  newplayerseason.save((err, docs) => {
    if (err) throw err;
    playerTotal.findById(req.params.playerid, (err, result) => {
      var seasons = [i(docs.season), ...result.seasons];
      var goals = i(docs.goals) + i(result.goals);
      var assists = i(docs.assists) + i(result.assists);
      var games = i(docs.games) + i(result.games);
      var hattricks = i(docs.hattricks) + i(result.hattricks);
      var cleanSheets = i(docs.cleanSheets) + i(result.cleanSheets);
      var shirtNumber = [];
      if (result.shirtNumber.length > 0) {
        var firstElement = result.shirtNumber[0];
        if (firstElement === docs.shirtNumber) {
          shirtNumber = result.shirtNumber;
        } else {
          shirtNumber = [docs.shirtNumber, ...result.shirtNumber];
        }
      } else {
        shirtNumber = [docs.shirtNumber];
      }
      var contributions = i(goals) + i(assists);
      var rating =
        f(f(docs.games) * f(docs.rating)) +
        f(f(result.games) * f(result.rating));
      rating = f(rating) / f(f(docs.games) + f(result.games));
      rating = round2(rating);
      var goalsPerGame = round2(f(goals) / f(games));
      var contributionsPerGame = round2(f(contributions) / f(games));
      playerTotal.updateOne(
        { _id: req.params.playerid },
        {
          // make updates to playerTotal here
          seasons: seasons,
          goals: goals,
          assists: assists,
          games: games,
          hattricks: hattricks,
          cleanSheets: cleanSheets,
          shirtNumber: shirtNumber,
          contributions: contributions,
          rating: rating,
          goalsPerGame: goalsPerGame,
          contributionsPerGame: contributionsPerGame,
        },
        (err, answer) => {
          if (err) throw err;
          console.log("answer=", answer);
        }
      );
    });
  });
  (playerUpdated.status = true), (playerUpdated.name = req.params.playername);
  res.redirect("/update/choose/sortby/rating");
});
module.exports = router;
