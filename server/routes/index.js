var express = require("express");
var router = express.Router();

var teamController = require("../controllers/team_crtl");
var reapleController = require("../controllers/reaple_crtl");
router.get("/main", teamController.team.getMain);
router.get("/team/:uuid", teamController.team.getTeam);
router.post("/like", teamController.process.likeTeam);
router.post("/write", reapleController.process.writeReaple);
router.post("/dislike", teamController.process.dislikeTeam);
router.get("/like/:uuid", teamController.team.isLikeAvailable);
router.post("/auth", teamController.process.getAuth);
router.post("/update", teamController.process.updateTeam);

module.exports = router;

