const express = require("express");
const router = express.Router();
const tournamentController = require("../controllers/tournamentController");

router.post("/", tournamentController.createTournament);
router.get("/", tournamentController.getAllTournaments);
router.get("/:id", tournamentController.getTournamentById);
router.delete("/:id", tournamentController.deleteTournament);
router.get(
  "/:tournamentId/leaderboard",
  tournamentController.getTournamentLeaderboard
);

module.exports = router;
