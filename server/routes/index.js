var express = require("express");
var router = express.Router();

var teamController = require("../controllers/team_ctrl");
var reapleController = require("../controllers/reaple_ctrl");
// router.get("/main", teamController);
router.get("/main", teamController.teams.getMain);
router.get("/team/:uuid", teamController.teams.getTeam);
router.post("/like", teamController.process.likeTeam);
router.post("/write", reapleController.process.writeReaple);
router.post("/dislike", teamController.process.dislikeTeam);
router.get("/like/:uuid", teamController.teams.isLikeAvailable);
router.post("/auth", teamController.process.getAuth);
router.post("/update", teamController.process.updateTeam);
router.post("/add",teamController.process.addTeam);

module.exports = router;

