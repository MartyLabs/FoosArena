const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController");

router.post("/generate/:tournamentId", matchController.generateMatches);
router.post("/update-score/:matchId", matchController.updateMatchScore);
router.get("/:tournamentId", matchController.getMatchesByTournament);
router.get("/team/:teamId", matchController.getMatchesByTeam);
router.get("/single/:matchId", matchController.getMatchById);
router.delete("/:tournamentId", matchController.deleteMatches);

module.exports = router;
