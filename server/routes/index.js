var express = require("express");
var router = express.Router();
var teamController = require("../controllers/team_ctrl")
var reapleController = require("../controllers/reaple_ctrl");
router.get("/team/:uuid", teamController.teams.getTeam);
router.post("/like", teamController.process.likeTeam);
router.post("/write", reapleController.process.writeReaple);
router.post("/dislike", teamController.process.dislikeTeam);
// router.get("/like/:uuid", teamController.teams.);
// router.post("/auth", teamController.getAuth);

module.exports = router;